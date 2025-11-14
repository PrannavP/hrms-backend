import { z } from "zod";
import { GenderType, EmployeeStatus, EmployeeType } from "@prisma/client";

// Registration schema
export const onBoardNewEmployeeSchema = z.object({
    full_name: z.string().min(2).max(20), // name should be string, min 2 and max 20
    email: z.string().email(), // email should be string and zod email validation (uses regex)
    password: z.string().min(6).max(50), // password should be string, min 6 and max 50
    address: z.string().min(2).max(50),
    contact_number: z.string().min(7).max(11),
    joined_date: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
        z.date()
    ),
    gender: z.nativeEnum(GenderType),
    type: z.nativeEnum(EmployeeType),
    date_of_birth: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
        z.date()
    ),
    status: z.nativeEnum(EmployeeStatus),
    Branch: z.number().positive("Branch should be valid."),
    Department: z.number().positive("Department should be valid."),
    Designation: z.number().positive("Designation should be valid.")
    // user_type: z.nativeEnum(UserType)
});

// Update employee schema
export const updateEmployeeSchema = z.object({
    full_name: z.string().min(2).max(20), // name should be string, min 2 and max 20
    email: z.string().email(), // email should be string and zod email validation (uses regex)
    password: z.string().min(6).max(50), // password should be string, min 6 and max 50
    address: z.string().min(2).max(50),
    contact_number: z.string().min(7).max(11),
    joined_date: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
        z.date()
    ),
    gender: z.nativeEnum(GenderType),
    type: z.nativeEnum(EmployeeType),
    date_of_birth: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
        z.date()
    ),
    status: z.nativeEnum(EmployeeStatus),
    Branch: z.number().positive("Branch should be valid."),
    Department: z.number().positive("Department should be valid."),
    Designation: z.number().positive("Designation should be valid.")
    // user_type: z.nativeEnum(UserType)
});