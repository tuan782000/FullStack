import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // conn: viết tắt của connection
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MONGODB`, error.message);
        process.exit(1); // 1 là thất bại - 0 là thành công
    }
};
