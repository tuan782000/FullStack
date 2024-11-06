import express from 'express';
import { verifyTokenAndAdmin } from '../../middlewares/verifyToken.js';
import { createProduct } from '../../controllers/product.controller.js';

const router = express();

router.post('/post', verifyTokenAndAdmin, createProduct);

export default router;
