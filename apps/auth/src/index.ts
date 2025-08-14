import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './config/passport';
import authRoutes from './routes/auth';

// Load environment variables
dotenv.config({ path: '../../.env' });


const app = express();
const PORT = process.env.AUTH_PORT || 3002;

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

// Session Middleware for Passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_default_session_secret',
    resave: false,
    saveUninitialized: false,
}));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => {
    console.error('Connection error', err);
    process.exit(1);
  });


// Routes
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('AmberOps Auth Service is running.');
});


app.listen(PORT, () => {
  console.log(`AmberOps Auth Service listening on port ${PORT}`);
});
