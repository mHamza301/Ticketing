import { ValidationError, validationResult } from 'express-validator';
import { CustomError } from './custom-Error';


export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]){
        super('Invalid Parameters passed');

        //Only necessary if extending TypeScript built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError() {
        return this.errors.map(err  =>{
            return { message: err.msg, field: err.param };
        });
    }
}