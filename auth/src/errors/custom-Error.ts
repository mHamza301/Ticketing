export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        //Only necessary if extending Typescript built-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeError() : { message: string, field?: string }[]
}