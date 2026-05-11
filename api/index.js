const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Health Check / Root API
app.get('/api', (req, res) => {
  res.json({ status: 'API is running' });
});

// Designs Endpoint (Prevents 500 for designs)
app.get('/api/designs', (req, res) => {
  try {
    res.json([]); // Return empty array safely
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});

// Contact Form Endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, date, message } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials missing in Environment Variables');
    return res.status(500).json({ 
      success: false, 
      error: 'Backend Configuration Error: Email credentials missing in Vercel settings.' 
    });
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
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Nodemailer Error:', err);
    res.status(500).json({ success: false, error: 'Email delivery failed. Check your Gmail App Password.' });
  }
});

module.exports = app;
