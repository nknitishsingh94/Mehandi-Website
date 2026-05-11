const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('CRITICAL: MONGO_URI is not defined in .env file');
}

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

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
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Routes
app.get('/api/designs', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    // Always return an array, even if empty
    res.json(designs || []);
  } catch (err) {
    console.error('Fetch Designs Error:', err);
    res.status(500).json([]); // Return empty array on error to prevent frontend crash
  }
});

app.post('/api/designs', async (req, res) => {
  try {
    const { title, src } = req.body;
    if (!title || !src) return res.status(400).json({ error: 'Missing fields' });
    
    const newDesign = new Design({ title, src });
    await newDesign.save();
    res.status(201).json(newDesign);
  } catch (err) {
    console.error('Post Design Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, date, message } = req.body;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
    subject: `New Inquiry from ${name} - Nargish Mehandi`,
    text: `
      Name: ${name}
      Email: ${email}
      Occasion Date: ${date}
      Message: ${message}
    `
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials missing');
    }
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
