import { ValidationError, validationResult } from 'express-validator';


export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]){
        super();

        //Only necessary if extending TypeScript built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
}