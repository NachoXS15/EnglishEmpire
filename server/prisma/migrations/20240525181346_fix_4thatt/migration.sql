-- DropIndex
DROP INDEX "Category_idCategory_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
