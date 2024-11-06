import express from 'express';
import { regsiterUser, loginUser } from '../../controllers/auth.controller.js';

const router = express();

// router.get('/testuser', (req, res) => {
//     res.send('testusser');
// });

router.post('/register', regsiterUser);
router.post('/login', loginUser);

export default router;
