// Login and Registration service

import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GenderType, EmployeeStatus, EmployeeType, UserType } from "@prisma/client";


// Interface for Register and Login (same like .Net DTO classes)
interface Register{
    full_name: string;
    email: string;
    password: string;
    joined_date: Date;
    contact_number: string;
    address: string;
    gender: GenderType;
    type: EmployeeType;
    date_of_birth: Date;
    status: EmployeeStatus;
    Branch: number;
    Department: number;
    Designation: number;
    user_type: UserType;
};

interface Login{
    email: string;
    password: string;
};

// Register function which takes the Register interface
export const register = async (data: Register) => {
    // Check if the email user already exists in user table
    const existing = await prisma.user.findUnique({
        where: { email: data.email }
    });

    // If exists the throw error
    if(existing) throw new Error("User already exists.");

    // If does not exists then hash the user entered password using Bcrypt with 10 rounds of salt
    const hashed = await bcrypt.hash(data.password, 10);

    // Store created user using Prisma ORM
    const user = await prisma.user.create({
        data: {
            full_name: data.full_name,
            email: data.email,
            password: hashed,
            address: data.address,
            contact_number: data.contact_number,
            joined_date: data.joined_date,
            gender: data.gender,
            type: data.type, // employee type
            date_of_birth: data.date_of_birth,
            status: data.status,
            Branch: data.Branch,
            Department: data.Department,
            Designation: data.Designation,
            user_type: data.user_type
        }
    });

    return { message: "Registration successful.", user };
};

export const login = async (data: Login) => {
    // Hardcoded admin credentials for DEV purpose
    // REMOVE THIS IN PRODUCTION
    if (data.email === process.env.ADMIN_EMAIL && data.password === process.env.ADMIN_PASSWORD) {
        // You can set a dummy user id or fetch the admin user from DB if needed
        const token = jwt.sign(
            { id: 0, email: data.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );
        return { status: 200, message: "Login successful", token };
    };
    
    // Check if the user exists or not
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });

    // If no user then throw error
    if(!user) throw new Error("Invalid credentials");

    // If user exists, check the user entered password and user table stored password using bcrypt compare function
    const match = await bcrypt.compare(data.password, user.password);

    // If password does not match throw error
    if(!match) throw new Error("Invalid credentials");

    // If password matches then generate a token using jwt with the .env secret key
    // and in token data send userId and email and expiry time with 7d
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    return { status: 200, message: "Login successful", token };
};