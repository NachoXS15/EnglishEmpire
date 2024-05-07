/*
  Warnings:

  - Added the required column `costo` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fin` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicio` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programa` to the `Cursos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idCategory" INTEGER NOT NULL,
    "inicio" TEXT NOT NULL,
    "fin" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costo" INTEGER NOT NULL,
    "programa" TEXT NOT NULL
);
INSERT INTO "new_Cursos" ("id", "idCategory", "name") SELECT "id", "idCategory", "name" FROM "Cursos";
DROP TABLE "Cursos";
ALTER TABLE "new_Cursos" RENAME TO "Cursos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
