import User from '../models/User.model.js';

const regsiterUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save(); // Lưu người dùng vào database

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

export { regsiterUser };
