import { CustomError } from "./custom-Error";

export class DatabaseConnectionError extends CustomError{ 
    statusCode = 500;
    reason = 'Error Connecting to Database';

    constructor(){
        super('Error connecting to db');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError() {
        return [{ message: this.reason}];
    }
}