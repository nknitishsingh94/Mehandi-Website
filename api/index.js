const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (!MONGODB_URI) {
    console.log('No MONGODB_URI found, using memory fallback');
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
  }
};

// Design Schema
const designSchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Design = mongoose.models.Design || mongoose.model('Design', designSchema);

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Health Check
app.get('/api', (req, res) => {
  res.json({ status: 'Backend is Running Perfectly!', database: isConnected ? 'Connected' : 'Offline (Fallback Mode)' });
});

// Get Designs
app.get('/api/designs', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});

// Add Design
app.post('/api/designs', async (req, res) => {
  try {
    const { src, title } = req.body;
    const newDesign = new Design({ src, title });
    await newDesign.save();
    res.json({ success: true, message: 'Design saved to database!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save design' });
  }
});

// Send Email
app.post('/api/send-email', async (req, res) => {
  const { name, email, date, message } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Email configuration missing' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER || 'nknitishsingh94@gmail.com',
    subject: `New Inquiry from ${name} - Nargish Mehandi`,
    text: `You have a new booking request:\n\nName: ${name}\nEmail: ${email}\nEvent Date: ${date}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = app;
