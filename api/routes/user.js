import express from 'express';

const router = express();

router.get('/testuser', (req, res) => {
    res.send('testusser');
});

export default router;
