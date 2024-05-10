/*
  Warnings:

  - Added the required column `img` to the `Cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cursos" ADD COLUMN     "img" TEXT NOT NULL;
