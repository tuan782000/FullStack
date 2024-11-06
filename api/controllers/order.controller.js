import Order from '../models/order.model.js';

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({
            message: 'An error occurred while creating the order',
            error: err.message
        });
    }
};

// Cập nhật đơn hàng
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({
            message: 'An error occurred while updating the order',
            error: err.message
        });
    }
};

// Xóa đơn hàng
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order has been deleted' });
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({
            message: 'An error occurred while deleting the order',
            error: err.message
        });
    }
};

// Lấy đơn hàng của người dùng
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({
            message: 'An error occurred while fetching user orders',
            error: err.message
        });
    }
};

// Lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching all orders:', err);
        res.status(500).json({
            message: 'An error occurred while fetching all orders',
            error: err.message
        });
    }
};

// Lấy thu nhập hàng tháng
const getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount'
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' }
                }
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        console.error('Error fetching monthly income:', err);
        res.status(500).json({
            message: 'An error occurred while fetching the monthly income',
            error: err.message
        });
    }
};

export {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrders,
    getAllOrders,
    getMonthlyIncome
};
