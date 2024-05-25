/*
  Warnings:

  - You are about to drop the column `idCategory` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_idCategory_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "idCategory";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_id_fkey" FOREIGN KEY ("id") REFERENCES "Cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
