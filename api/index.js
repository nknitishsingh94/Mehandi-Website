import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection Logic
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return true;
  if (!MONGODB_URI) return false;
  
  try {
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      return true;
    }
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 
    });
    isConnected = true;
    return true;
  } catch (err) {
    console.error('DB Connection Error:', err.message);
    return false;
  }
};

// Design Schema
const designSchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Design = mongoose.models.Design || mongoose.model('Design', designSchema);

// Routes
app.get('/api', (req, res) => {
  res.json({ status: 'Active', database: isConnected ? 'Connected' : 'Standby' });
});

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Backend is Live (ESM Mode)' });
});

app.get('/api/designs', async (req, res) => {
  await connectDB();
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs || []);
  } catch (err) {
    res.json([]); 
  }
});

app.post('/api/designs', async (req, res) => {
  await connectDB();
  if (!isConnected) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  try {
    const { src, title } = req.body;
    const newDesign = new Design({ src, title });
    await newDesign.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Save failed' });
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, date, message } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Server Email Config Missing' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || 'nknitishsingh94@gmail.com',
      subject: `Inquiry: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Mail failed' });
  }
});

export default app;
