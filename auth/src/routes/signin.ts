import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-Request-Error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid.'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Enter a valid password.')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }
        const passwordMatch = await Password.compare(
            existingUser.password, 
            password
        );
        if(!passwordMatch) {
            throw new BadRequestError('Invalid Credentials');
        }
         //Generate a Token
         const userJWT = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!
        );

        //Storing it in session object
        req.session = {
            jwt: userJWT
        };

        res.status(200).send(existingUser);
        
    }

);

export { router as signinRouter };