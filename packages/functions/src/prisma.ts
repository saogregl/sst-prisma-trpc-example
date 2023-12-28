import { PrismaClient } from "@prisma/client";
import { Config } from "sst/node/config";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
