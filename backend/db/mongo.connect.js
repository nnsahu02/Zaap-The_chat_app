import mongoose from "mongoose";
const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully✔️');
    } catch (error) {
        console.error('Error in connectDB: ', error.message);
    }
}

export default connectDB;