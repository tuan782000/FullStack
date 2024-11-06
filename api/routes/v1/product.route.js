import express from 'express';
import { verifyTokenAndAdmin } from '../../middlewares/verifyToken.js';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct
} from '../../controllers/product.controller.js';

const router = express();

router.get('/list', getAllProduct);
router.get('/product-by-id/:id', getProduct);
router.post('/post', verifyTokenAndAdmin, createProduct);
router.put('/edit/:id', verifyTokenAndAdmin, updateProduct);
router.delete('/delete/:id', verifyTokenAndAdmin, deleteProduct);

export default router;
