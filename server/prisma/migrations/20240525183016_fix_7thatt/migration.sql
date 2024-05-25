-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_id_fkey";

-- AlterTable
ALTER TABLE "Cursos" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Cursos" ADD CONSTRAINT "Cursos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
