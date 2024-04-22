import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ message: 'This userName already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfile : girlProfile
        });

        if (newUser) {
            await newUser.save();
            return res.status(201).json({
                message: 'User registered successfully',
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            });
        } else {
            return res.status(400).send({ message: "Invalid User Data" })
        }

    } catch (error) {
        console.error('Error in signup: ', error);
        return res.status(500).json({ error: error.message });
    }
}

export const logIn = async (req, res) => {
    try {

    } catch (error) {
        console.error('Error in login: ', error);
        return res.status(500).json({ error: error.message });
    }
}

export const logOut = async (req, res) => {
    try {

    } catch (error) {
        console.error('Error in logout: ', error);
        return res.status(500).json({ error: error.message });
    }
}