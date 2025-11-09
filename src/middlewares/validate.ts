import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

// A custom validation function which takes zod validation schema and validates with request body data
export const validate =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        try{
            schema.parse(req.body);
            next();
        }catch(err: any){
            // Display proper zod validation error if the req.body has validation error(s)
            if (err instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    errors: err.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    })),
                });
            }

            // fallback message
            return res.status(500).json({ error: "Unexpected validation error." });
        }
    };