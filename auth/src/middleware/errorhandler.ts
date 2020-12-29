import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-Validation-Error';
import { DatabaseConnectionError } from '../errors/database-Connection-Error';
 

export const errorHandler = ( 
    err: Error,  
    req: Request, 
    res: Response,  
    next: NextFunction
    ) => {
    if(err instanceof RequestValidationError) {
        console.log('This is Request Validation Issue');
    }
    if(err instanceof DatabaseConnectionError) {
        console.log('This is Database Connection Issue');
    }

    res.status(400).send({
        message: err.message
    });
};