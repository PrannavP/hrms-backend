import { PrismaClient, UserType } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getMenusForUser(userType: UserType){
    const menus = await prisma.menu.findMany({
        select: {
            id: true,
            name: true,
            url: true,
            order_id: true
        },
        where: {
            access_to: userType
        },
        orderBy: {
            order_id: "asc"
        }
    });

    return menus;
}