import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) =>{
    res.send('Hi There Once Again!');
});

export { router as signinRouter };