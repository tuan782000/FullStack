import express from 'express';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../../middlewares/verifyToken.js';
import {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrders,
    getAllOrders,
    getMonthlyIncome
} from '../../controllers/order.controller.js';

const router = express.Router();

// Tạo đơn hàng mới
router.post('/', verifyToken, createOrder);

// Cập nhật đơn hàng
router.put('/:id', verifyTokenAndAdmin, updateOrder);

// Xóa đơn hàng
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);

// Lấy đơn hàng của người dùng
router.get('/find/:userId', verifyTokenAndAuthorization, getUserOrders);

// Lấy tất cả đơn hàng (admin)
router.get('/', verifyTokenAndAdmin, getAllOrders);

// Lấy thu nhập hàng tháng
router.get('/income', verifyTokenAndAdmin, getMonthlyIncome);

export default router;
