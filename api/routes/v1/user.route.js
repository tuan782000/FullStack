import express from 'express';
import {
    verifyTokenAndAuthorization,
    verifyToken,
    verifyTokenAndAdmin
} from '../../middlewares/verifyToken.js';
import {
    deleteUser,
    updateInfo,
    getUser,
    getAllUsers,
    getStats
} from '../../controllers/user.controller.js';

const router = express();

// Update
router.put('/edit/:id', verifyTokenAndAuthorization, updateInfo);
router.delete('/delete/:id', verifyTokenAndAdmin, deleteUser);

// Get User
router.get('/find/:id', verifyTokenAndAdmin, getUser);

// Get all user
router.get('/list', verifyTokenAndAdmin, getAllUsers);

// STATS: thống kê
router.get('/stats', verifyTokenAndAdmin, getStats);

export default router;
