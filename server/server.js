import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import UserRoute from './routes/UserRoute.js';
import BasicDetailsRoute from './routes/BasicDetailsRoute.js';
import ProjectRoute from './routes/ProjectRoute.js';
import AcademicRoute from './routes/AcademicRoute.js';
import ExperienceRoute from './routes/ExperienceRoute.js';

import CertificateRoute from './routes/CertificateRoute.js';
import ContactRoute from './routes/ContactRoute.js';

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
const allowedOrigins = ['http://localhost:5173'];
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
app.use('/api/auth', UserRoute);
app.use("/api/profile", BasicDetailsRoute);

app.use('/api/projects', ProjectRoute);
app.use('/api/academics', AcademicRoute);
app.use('/api/experiences', ExperienceRoute);
app.use('/api/certificates', CertificateRoute);

app.use('/api/contact', ContactRoute);

app.use("/uploads", express.static("uploads")); // serve files

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
