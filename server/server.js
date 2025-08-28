import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import academicRoutes from './routes/academics.js';
import certificateRoutes from './routes/certificates.js';
import resumeRoutes from './routes/resume.js';
import contactRoutes from './routes/contact.js';
import profileRoutes from './routes/profileRoutes.js';

// Load environment variables
dotenv.config();

import ConnectDB from './config/database.js';

// Initialize app
const app = express();

// Connect to MongoDB
ConnectDB();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/contact', contactRoutes);

app.use("/uploads", express.static("uploads")); // serve files
app.use("/api/profile", profileRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
