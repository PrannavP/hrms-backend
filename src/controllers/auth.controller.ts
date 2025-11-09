import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    try{
        // Call the AuthService to register with the request body data and store in result
        const result = await AuthService.register(req.body);

        // response the result data in json format
        res.json(result);
    }catch(err: any){
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try{
        // Call the AuthService to login with the request body data and store in result
        const result = await AuthService.login(req.body);
        // response the result data in json format
        res.json(result);
    }catch(err: any){
        res.status(401).json({ message: err.message });
    }
};