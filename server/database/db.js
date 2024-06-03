import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
try {
    prisma.$connect
} catch (error) {
    throw new Error("No se pudo establecer conexión con la base de datos.");
}

export default prisma


