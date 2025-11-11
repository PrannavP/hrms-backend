import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include user
export interface AuthRequest extends Request{
    user?: any;
};

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    // Get the authorization headers data values
    const authHeader = req.headers.authorization;

    // if not found any data values in header which starts with Bearer then give error response
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "No token provided." });
    };

    // store the token from header by spliting
    const token = authHeader.split(" ")[1];

    // decode theeken and then store the decoded value in req.user else throw error response
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = decoded; // Attach user info to request
        next();
    }catch(err){
        return res.status(401).json({ message: "Invalid token." });
    }
};

/* Allow routes according to allowedTypes (either admin or employee)
// This middleware works like this: =>
// Checks for a JWT token in the Authorization header (Bearer <token>).
// If present, verifies the token using your secret key.
// If valid, attaches the decoded user info (including user_type) to req.user.
// If missing or invalid, responds with 401 Unauthorized.
// authorize(["admin"])

// Checks if req.user.user_type matches any allowed types (e.g., "admin").
// If yes, allows the request to proceed.
// If not, responds with 403 Forbidden.
*/
export const authorize = (allowedTypes: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !allowedTypes.includes(req.user.user_type)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};