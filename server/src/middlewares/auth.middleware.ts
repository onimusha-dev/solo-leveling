import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { asyncHandler } from '../utils/asyncHandler';
import { IUserDocument, User } from '../models/User';

export interface AuthenticatedRequest extends Request {
    user?: IUserDocument
}

export const authMiddleware = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction)
    : Promise<Response | void> => {
    try {

        const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token)
            return res.status(401).json({ error: 'Unauthorized' })

        const decodedToken = jwt.verify(token, env.accessTokenCode) as { id: string };

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})