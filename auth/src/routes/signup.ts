import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
'/api/users/signup', 
[
    body('email')
        .isEmail()
        .withMessage('Enter a valid Email.'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 15 })
        .withMessage('Password must be between 4 & 15 Characters. ')
], 
    (req: Request, res: Response) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    const {email, password} = req.body;
    console.log('hey');
    res.send({});
});

export { router as signupRouter };