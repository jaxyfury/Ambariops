
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import passport from 'passport';

const router = Router();
const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';

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
    
    // Convert to object and create a response DTO to ensure no sensitive data is returned
    const userResponse = {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        image: savedUser.image,
    };

    res.status(201).json(userResponse);
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

        const user = await User.findOne({ email }).select('+password');
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
        
        const userPayload = { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image };

        const token = jwt.sign(
            userPayload,
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({ token, user: userPayload });

    } catch (error: any) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
});


// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${homeUrl}/auth` }), (req: Request, res: Response) => {
    const user = req.user as IUser;
    const userPayload = { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image };
    const token = jwt.sign(
        userPayload,
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
    // Redirect with token. A real app might set a cookie or use a more secure method.
    res.redirect(`${homeUrl}/auth?token=${token}&user=${encodeURIComponent(JSON.stringify(userPayload))}`);
});


// GitHub OAuth
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: `${homeUrl}/auth` }), (req: Request, res: Response) => {
    const user = req.user as IUser;
    const userPayload = { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image };
    const token = jwt.sign(
        userPayload,
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
    // Redirect with token
    res.redirect(`${homeUrl}/auth?token=${token}&user=${encodeURIComponent(JSON.stringify(userPayload))}`);
});


export default router;
