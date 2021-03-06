import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@brokerhs/common';


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
    validateRequest,
    async (req: Request, res: Response) => {
        
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser) {
           throw new  BadRequestError('Email Already in use.');
        }

        const user = User.build({ email, password });
        await user.save();

        //Generate a Token
        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!
        );

        //Storing it in session object
        req.session = {
            jwt: userJWT
        };

        res.status(201).send(user);
    }
);

export { router as signupRouter };