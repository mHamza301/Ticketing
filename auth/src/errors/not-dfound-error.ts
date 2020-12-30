import { CustomError } from "./custom-Error"


export class NotFoundError extends CustomError {
   statusCode = 404;
   
    constructor(){
        super('Uh Oh! Page Not Found');
    
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    
    serializeError() {

        return [{ message: 'Page Not Found'}];
    }

}