import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/index.js';
import { AuthRequest } from '../middleware/auth.js';

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
            return;
        }

        const secret: Secret = config.jwtSecret || 'fallback_secret';
        const options: SignOptions = { expiresIn: (config.jwtExpiresIn || '7d') as SignOptions['expiresIn'], };
        const token = jwt.sign({ id: user._id }, secret, options);

        res.json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, email: user.email, role: user.role, },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
}