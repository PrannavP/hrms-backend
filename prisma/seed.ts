import { EmployeeStatus, EmployeeType, GenderType, PrismaClient, UserType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main(){
    //#region Seed Data

    // Seed custom menu
    const adminMenus = [
        {
            id: 1,
            name: 'DASHBOARD',
            description: "DASHBOARD",
            url: "/admin/dashboard",
            order_id: 1,
            access_to: UserType.admin
        },
        {
            id: 2,
            name: 'EMPLOYEES',
            description: "EMPLOYEES",
            url: "/admin/employees",
            order_id: 2,
            access_to: UserType.admin
        },
        {
            id: 3,
            name: 'ATTENDANCE',
            description: "ATTENDANCE",
            url: "/admin/attendance",
            order_id: 3,
            access_to: UserType.admin
        },
        {
            id: 4,
            name: 'LEAVES',
            description: "LEAVES",
            url: "/admin/leaves",
            order_id: 4,
            access_to: UserType.admin
        },
        {
            id: 5,
            name: 'HOLIDAY & ANNOUNCEMENT',
            description: "HOLIDAY & ANNOUNCEMENT",
            url: "/admin/leaves",
            order_id: 4,
            access_to: UserType.admin
        },
        {
            id: 6,
            name: 'PAYROLL',
            description: "PAYROLL",
            url: "/admin/payrol",
            order_id: 4,
            access_to: UserType.admin
        },
        {
            id: 7,
            name: 'SETTINGS',
            description: "SETTINGS",
            url: "/admin/settings",
            order_id: 4,
            access_to: UserType.admin
        }
    ];

    // employees menu
    const employeeMenus = [
        {
            id: 8,
            name: 'DASHBOARD',
            description: "DASHBOARD",
            url: "/employee/dashboard",
            order_id: 1,
            access_to: UserType.employee
        },
        {
            id: 9,
            name: 'ATTENDANCE',
            description: "ATTENDANCE",
            url: "/employee/attendance",
            order_id: 2,
            access_to: UserType.employee
        },
        {
            id: 10,
            name: 'LEAVES',
            description: "LEAVES",
            url: "/employee/leaves",
            order_id: 3,
            access_to: UserType.employee
        },
        {
            id: 11,
            name: 'HOLIDAY & ANNOUNCEMENT',
            description: "HOLIDAY & ANNOUNCEMENT",
            url: "/employee/leaves",
            order_id: 4,
            access_to: UserType.employee
        },
        {
            id: 12,
            name: 'MY PROFILE',
            description: "MY PROFILE",
            url: "/employee/my-profile",
            order_id: 5,
            access_to: UserType.employee
        }
    ];

    // hash the admin password before seeding
    const password = "Admin@123";
    const hashedPassword = await bcrypt.hash(password, 10); // same as register and login

    // Admin seed
    const adminData = {
        email: "admin@hrms.com",
        password: hashedPassword,
        full_name: "Admin Admin",
        user_type: UserType.admin,
        joined_date: new Date("2025-11-10"),
        contact_number: "9801234567",
        address: "Naxal, Kathmandu",
        gender: GenderType.male,
        type: EmployeeType.permanent,
        date_of_birth: new Date("1995-05-18"),
        status: EmployeeStatus.working,
        Branch: 1,
        Department: 1,
        Designation: 1
    };

    const employeePassword = "Prannav@123";
    const employeeHashedPassword = await bcrypt.hash(employeePassword, 10); // same as register and login

    // Employee seed
    const employeeData = {
        email: "prannav@hrms.com",
        password: employeeHashedPassword,
        full_name: "Prannav Panta",
        user_type: UserType.employee,
        joined_date: new Date("2025-05-01"),
        contact_number: "9841234567",
        address: "Jwagal, Lalitpur",
        gender: GenderType.male,
        type: EmployeeType.permanent,
        date_of_birth: new Date("2000-05-18"),
        status: EmployeeStatus.working,
        Branch: 1,
        Department: 1,
        Designation: 1
    };

    //#endregion


    //#region Seed function in db

    // Insert or update (avoid duplicate error)
    // admin side menu
    for(const adminMenu of adminMenus){
        await prisma.menu.upsert({
            where: { id: adminMenu.id }, // unique identifier
            update: {},
            create: adminMenu
        });
    };

    // admin side menu data seeding
    for(const employeeMenu of employeeMenus){
        await prisma.menu.upsert({
            where: { id: employeeMenu.id }, // unique identifier
            update: {},
            create: employeeMenu
        });
    };

    // ADMIN DATA SEEDING
    await prisma.user.upsert({
        where: { email: adminData.email },
        update: {},
        create: adminData
    });

    // EMPLOYEE DATA SEEDING
    await prisma.user.upsert({
        where: { email: employeeData.email },
        update: {},
        create: employeeData
    });
    
    //#endregion

    console.log("Menu & Admin data Seed Completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });