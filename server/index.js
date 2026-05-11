const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
// NOTE: You need to add MONGO_URI and EMAIL_PASS to your .env file
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.mongodb.net/mehandi';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Design Schema
const designSchema = new mongoose.Schema({
  title: String,
  src: String,
  createdAt: { type: Date, default: Date.now }
});
const Design = mongoose.model('Design', designSchema);

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// API Routes
app.get('/api/designs', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/designs', async (req, res) => {
  try {
    const newDesign = new Design(req.body);
    await newDesign.save();
    res.status(201).json(newDesign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, date, message } = req.body;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
    subject: `New Inquiry from ${name} - Royal Mehandi`,
    text: `
      Name: ${name}
      Email: ${email}
      Occasion Date: ${date}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
