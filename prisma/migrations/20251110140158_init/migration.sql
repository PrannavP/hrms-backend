-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('employee', 'admin');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('contract', 'permanent', 'temporary');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('working', 'not_working');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL,
    "joined_date" TIMESTAMP(3) NOT NULL,
    "contact_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "GenderType" NOT NULL,
    "type" "EmployeeType" NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "status" "EmployeeStatus" NOT NULL,
    "Branch" INTEGER NOT NULL,
    "Department" INTEGER NOT NULL,
    "Designation" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "access_to" "UserType" NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_id_key" ON "Menu"("id");
