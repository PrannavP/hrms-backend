import { PrismaClient } from "@prisma/client";

// Create new instance of PrismaClient from prisma so we can use it in controllers.
const prisma = new PrismaClient();

export default prisma;