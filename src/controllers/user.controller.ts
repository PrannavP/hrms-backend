import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";

export const getProfile = async (req: AuthRequest, res: Response) => {
    try{
        // Get the userId from the req object which comes from AuthRequest middleware
        const userId = req.user.id;

        // Select the user which has the userId and select its id, name, email and created from the table using Prisma ORM
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                full_name: true,
                email: true,
                createdAt: true
            }
        });

        // If no user then throw error response
        if(!user) return res.status(404).json({ message: "User not found." });

        // return user data in response
        res.json(user);
    }catch(err: any){
        res.status(500).json({ message: err.message });
    }
};