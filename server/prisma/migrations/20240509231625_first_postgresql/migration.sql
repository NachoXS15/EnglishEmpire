-- CreateTable
CREATE TABLE "Cursos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idCategory" INTEGER NOT NULL,
    "inicio" TEXT NOT NULL,
    "fin" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costo" INTEGER NOT NULL,
    "programa" TEXT NOT NULL,

    CONSTRAINT "Cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "idCategory" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("idCategory")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_idCategory_key" ON "Category"("idCategory");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
