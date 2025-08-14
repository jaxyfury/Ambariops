
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import api from './api';
import { errorHandler } from './utils/error-handler';

// Load environment variables from the root .env file
dotenv.config({ path: '../../.env' });

// Global Mongoose settings for toJSON and toObject transformations
mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  }
});
mongoose.set('toObject', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  }
});


const app = express();
const PORT = process.env.BACKEND_PORT || 3004;

// Basic security middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001',
    process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003',
  ],
  credentials: true,
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, 
	legacyHeaders: false, 
});
app.use(limiter);


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Backend successfully connected to MongoDB.'))
  .catch(err => {
    console.error('Backend connection error', err);
    process.exit(1);
  });

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.send('AmberOps Backend Service is running. Visit /api-docs for API documentation.');
});

// 404 Handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Centralized error handler
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`AmberOps Backend Service listening on port ${PORT}`);
});
