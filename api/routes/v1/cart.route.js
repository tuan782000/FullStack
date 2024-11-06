import express from 'express';
import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} from '../../middlewares/verifyToken.js';
import {
    createNewCart,
    updateExistingCart,
    removeCart,
    getUserCart,
    getAllCarts
} from '../../controllers/cart.controller.js';

const router = express.Router();

// Tạo giỏ hàng mới
router.post('/', verifyToken, createNewCart);

// Cập nhật giỏ hàng
router.put('/:id', verifyTokenAndAuthorization, updateExistingCart);

// Xóa giỏ hàng
router.delete('/:id', verifyTokenAndAuthorization, removeCart);

// Lấy giỏ hàng của người dùng theo userId
router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart);

// Lấy tất cả giỏ hàng (dành cho admin)
router.get('/', verifyTokenAndAdmin, getAllCarts);

export default router;
