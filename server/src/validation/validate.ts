import { Request, Response, NextFunction } from "express";
import {z, ZodError} from "zod"


export const validator =
    (schema: z.ZodTypeAny, location: "body" | "query" | "params" = "body") =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = schema.parse(req[location]);
                (req as any)[location] = result; // overwrite with parsed + typed result
                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    return res.status(400).json({
                        errors: err
                    });
                }
                next(err);
            }
        };
