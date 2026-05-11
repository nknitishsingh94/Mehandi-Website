const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Contact Form Endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, date, message } = req.body;

  // Setup Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password from Google
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
    console.error('Email Error:', err);
    res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
});

// Export for Vercel
module.exports = app;
