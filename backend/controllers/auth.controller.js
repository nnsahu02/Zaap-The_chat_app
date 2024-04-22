import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../util/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'This username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfile : girlProfile
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            return res.status(201).json({
                message: 'User registered successfully',
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
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
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username });
        const isPassCorrect = bcrypt.compare(password, user?.password || "");
        if (!user || !isPassCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            message: 'User logged in successfully',
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.error('Error in login: ', error);
        return res.status(500).json({ error: error.message });
    }
}

export const logOut = (req, res) => {
    try {
        res.cookie("jwt", { maxAge: 0 });
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error in logout: ', error);
        return res.status(500).json({ error: error.message });
    }
}