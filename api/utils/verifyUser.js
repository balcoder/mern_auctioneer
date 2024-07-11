import { errorHandler } from "./errors.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // we named the cookie we store in local access_token
    const token = req.cookies.access_token;
    console.log(token);
    
    if(!token) return next(errorHandler(401, 'Unauthorized'))

        jwt.verify(token, process.env.JWT_SECRET, (err, user ) => {
            if(err) return next(errorHandler(403, 'Forbidden'));
            req.user = user;
            // goto next which is updateUser in routes/user.route.js
            next();
        });
    
};