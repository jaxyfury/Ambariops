
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

// Load environment variables from the root .env file
dotenv.config({ path: '../../.env' });

const app = express();
const PORT = process.env.BACKEND_PORT || 3004;

// Middleware
app.use(cors({
  origin: [
    process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001',
    process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003',
  ],
  credentials: true,
}));
app.use(express.json());

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

// API Routes
app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
    res.send('AmberOps Backend Service is running.');
});

app.listen(PORT, () => {
  console.log(`AmberOps Backend Service listening on port ${PORT}`);
});
