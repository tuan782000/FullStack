import express from 'express';
import { regsiterUser } from '../../controllers/auth.controller.js';

const router = express();

// router.get('/testuser', (req, res) => {
//     res.send('testusser');
// });

router.post('/register', regsiterUser);

export default router;
