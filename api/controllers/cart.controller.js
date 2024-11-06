import Cart from '../models/cart.model.js';

// Tạo giỏ hàng mới
const createNewCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        console.error('Error creating cart:', err);
        res.status(500).json({
            message: 'An error occurred while creating the cart',
            error: err.message
        });
    }
};

// Cập nhật giỏ hàng
const updateExistingCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(updatedCart);
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({
            message: 'An error occurred while updating the cart',
            error: err.message
        });
    }
};

// Xóa giỏ hàng
const removeCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart has been deleted' });
    } catch (err) {
        console.error('Error deleting cart:', err);
        res.status(500).json({
            message: 'An error occurred while deleting the cart',
            error: err.message
        });
    }
};

// Lấy giỏ hàng của người dùng
const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error('Error fetching user cart:', err);
        res.status(500).json({
            message: 'An error occurred while fetching the user cart',
            error: err.message
        });
    }
};

// Lấy tất cả giỏ hàng (dành cho admin)
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        console.error('Error fetching all carts:', err);
        res.status(500).json({
            message: 'An error occurred while fetching all carts',
            error: err.message
        });
    }
};

export {
    createNewCart,
    updateExistingCart,
    removeCart,
    getUserCart,
    getAllCarts
};
