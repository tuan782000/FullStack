import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const regsiterUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Kiểm tra nếu `username`, `email`, hoặc `password` bị thiếu
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Mã hóa mật khẩu
        const saltRounds = 10; // Độ mạnh của mã hóa, có thể tùy chỉnh
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save(); // Lưu người dùng vào database

        // const { password, others } = newUser;

        newUser.password = undefined;

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            message: 'An error occurred while registering the user',
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra nếu `email` hoặc `password` bị thiếu
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Tìm người dùng trong cơ sở dữ liệu theo email
        const user = await User.findOne({ email });

        // Kiểm tra nếu người dùng không tồn tại
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        // Kiểm tra mật khẩu có khớp không
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '3d'
            }
        );

        user.password = undefined;

        const { ...infoUser } = user._doc;

        // Trả về thông tin người dùng đã đăng nhập thành công
        res.status(200).json({
            message: 'User logged in successfully',
            user: { infoUser, accessToken }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            message: 'An error occurred while logging in the user',
            error: error.message
        });
    }
};

export { regsiterUser, loginUser };
