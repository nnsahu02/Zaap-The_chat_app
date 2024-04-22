import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "nSXdlYGtKJ1nuJLnlpNS5k7oZeBVQI3OjbO3h36fiRk=";
const NODE_ENV = process.env.NODE_ENV || "development";

const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15d' });
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === 'production' ? true : false
        })
    } catch (error) {
        console.error('Error in generateTokenAndSetCookie: ', error);
        return res.status(500).json({ error: error.message });
    }
}

export default generateTokenAndSetCookie;