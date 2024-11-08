import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/v1/user.route.js';
import authRouter from './routes/v1/auth.route.js';
import productRouter from './routes/v1/product.route.js';
import cartRouter from './routes/v1/cart.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json()); // allows you to parse the body of the request
app.use(cookieParser());

// test route
app.get('/', () => {
    console.log('test is successfully');
});
app.use('/api/users', authRouter); // '/api/users' sẽ là tiền tố cho các route trong router
app.use('/api/users', userRouter); // '/api/users' sẽ là tiền tố cho các route trong router
app.use('/api/products', productRouter); // '/api/users' sẽ là tiền tố cho các route trong router
app.use('/api/carts', cartRouter); //

const startServer = async () => {
    try {
        // Đảm bảo kết nối thành công với MongoDB trước khi chạy server
        await connectDB();
        console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`Backend Server is running on Port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
};

startServer();
