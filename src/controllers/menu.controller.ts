import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";
import getMenusForUser from "../utils/GetMenuForUser";

// Controller to return menu for admin or employee depending in user_type
export const getMenu = async(req: AuthRequest, res: Response) => {
    try{
        // Get the id from reqyest
        const userId = req.user.id;

        // Validate user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                user_type: true
            }
        });

        // If no user then throw error response
        if(!user) return res.status(404).json({ message: "User not found." });

        // Get the user's user_type so we can return menu according to it.
        const user_type = user.user_type;

        if(user_type === 'admin'){
            // return admin related menu only
            const admin_menu = await getMenusForUser(user_type);
            
            res.json(admin_menu);
        }else if(user_type === 'employee'){
            // return employee related menu only
            const employee_menu = await getMenusForUser(user_type);
            res.json(employee_menu);
        }
    }catch(err: any){
        res.status(500).json({ message: err.message });
    }
};