-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "first_name_th" TEXT NOT NULL,
    "middle_name_th" TEXT,
    "last_name_th" TEXT NOT NULL,
    "first_name_en" TEXT NOT NULL,
    "middle_name_en" TEXT,
    "last_name_en" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "patient_hn" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,
    "passport_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);
