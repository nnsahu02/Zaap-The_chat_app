import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error in getUsersForSidebar: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        console.log('getUserById');
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserById: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}