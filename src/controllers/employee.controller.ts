import { Response, Request } from "express";
import prisma from "../config/prisma";
import { GenderType, EmployeeStatus, EmployeeType, UserType } from "@prisma/client";
import bcrypt from "bcrypt";

// Interface for employee creation
interface Employee{
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

// controller for admin to create new employee
export const onBoardNewEmployee = async (req: Request, res: Response) => {
    try{
        const data = req.body;

        // Check if the email user already exists in user table
        const existing = await prisma.user.findUnique({
            where: { email: data.email}
        });

        // If existing then throw error
        if(existing) throw new Error("Employee with same email already exists.");

        // If does not exists then has the entered password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Store created employee
        const newEmployee = await prisma.user.create({
            data:{
                full_name: data.full_name,
                email: data.email,
                password: hashedPassword,
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
                user_type: UserType.employee // set explicitly employee
            }
        });

        // return { message: "Employee Created Successfully.", newEmployee };
        res.status(200).json({ message: "Employee Create Successfully", newEmployee });
    }catch(err){
        console.error("Error while on board new employee ", err);
        res.status(500).json({
            message: "Error onboarding new employee",
            error: err instanceof Error ? err.message : String(err)
        });
    }
};

// controller for admin to edit employee details
export const editEmployeeDetails = async (req: Request, res: Response) => {
    try{
        const data = req.body;

        // Check if employee exists
        const employeeExists = await prisma.user.findUnique({
            where: { id: data.id }
        });

        // If existing then throw error
        if(!employeeExists) throw new Error("Employee does not exists.");

        // If exists then check if the password is updated or not
        let passwordToUse: string;
        const isSamePassword = await bcrypt.compare(data.password, employeeExists.password);
        if (isSamePassword) {
            passwordToUse = employeeExists.password;
        } else {
            passwordToUse = await bcrypt.hash(data.password, 10);
        }

        const updatedEmployee = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                full_name: data.full_name,
                email: data.email,
                password: passwordToUse,
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

        res.status(200).json({ message: "Employee Updated Successfully.", updatedEmployee });
    }catch(err){
        console.error("Error updating employee", err);
        res.status(500).json({
            message: "Error updating employee.",
            errror: err instanceof Error ? err.message : String(err)
        });
    }
};

// controller for admin to get a employee data
export const getEmployeeDetails = async(req: Request, res: Response) => {
    try{
        // get employee id from query
        const employeeId = Number(req.query.id);

        const employee = await prisma.user.findUnique({
            omit:{
                password: true
            },
            where: {
                id: employeeId
            }
        });

        // if no employee found then return
        if(!employee)
            res.status(404).json({ message: "Employee not found.",  });

        res.status(200).json({ employee });
    }catch(err){
        console.error("Error fetching employee data", err);
        return res.status(500).json({
            message: "Error fetching employee data",
            error: err instanceof Error ? err.message : String(err)
        });
    }
};