import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-Authorized-Error';


export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.currentUser) {
        throw new NotAuthorizedError();
    }

    next();
};