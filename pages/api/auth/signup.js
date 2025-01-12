// filepath: /c:/Users/rj/OneDrive/Desktop/Next/Awadh Attar/awadh-attar/pages/api/auth/signup.js
import connectToDatabase from '../../../utils/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await connectToDatabase();

    try {
        if (req.method === 'POST') {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const user = new User({
                username,
                email,
                password: hashedPassword,
            });

            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}