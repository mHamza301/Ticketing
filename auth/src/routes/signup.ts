import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-Validation-Error';
import { DatabaseConnectionError } from '../errors/database-Connection-Error';

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

     async (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    
    console.log('Creating new user');
    throw new DatabaseConnectionError();

    res.send({});
    }
);

export { router as signupRouter };