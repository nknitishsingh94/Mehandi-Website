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

// Stat Schema (for dynamic counters)
const statSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: { type: Number, default: 0 }
});

const Stat = mongoose.models.Stat || mongoose.model('Stat', statSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

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

// Get Stats
app.get('/api/stats', async (req, res) => {
  await connectDB();
  try {
    // Force reset for one time if needed, or just find
    let stats = await Stat.findOne({ key: 'happyBrides' });
    
    if (stats && stats.value > 10) {
       stats.value = 0;
       await stats.save();
    }

    if (!stats) {
      stats = new Stat({ key: 'happyBrides', value: 0 });
      await stats.save();
    }
    res.json({ happyBrides: stats.value });
  } catch (err) {
    res.json({ happyBrides: 0 });
  }
});

// Reviews API
app.get('/api/reviews', async (req, res) => {
  await connectDB();
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
    res.json(reviews || []);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/reviews', async (req, res) => {
  await connectDB();
  try {
    const { name, message, rating } = req.body;
    const newReview = new Review({ name, message, rating });
    await newReview.save();
    
    // Increment Happy Brides count for each review too
    await Stat.findOneAndUpdate(
      { key: 'happyBrides' },
      { $inc: { value: 1 } },
      { upsert: true }
    );
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save review' });
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
  const { name, email, countryCode, phone, date, message } = req.body;

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
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${countryCode} ${phone}\nDate: ${date}\nMessage: ${message}`
    });

    // Increment Happy Brides count on successful contact
    try {
      await Stat.findOneAndUpdate(
        { key: 'happyBrides' },
        { $inc: { value: 1 } },
        { upsert: true }
      );
    } catch (e) {
      console.error("Counter update failed", e);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Mail failed' });
  }
});

export default app;
