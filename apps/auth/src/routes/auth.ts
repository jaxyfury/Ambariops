import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = Router();

// POST /api/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'Viewer' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      image: `https://avatar.vercel.sh/${email}`,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
});

// POST /api/login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password as string);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        
        user.lastLogin = new Date();
        await user.save();

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('FATAL ERROR: JWT_SECRET is not defined.');
            return res.status(500).json({ message: 'Server configuration error.' });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image } });

    } catch (error: any) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
});


export default router;
