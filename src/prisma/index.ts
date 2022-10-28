import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

(async function connect() {
  try {
    await prisma.$connect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
