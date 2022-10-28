import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

(async function connect() {
  try {
    await prisma.$connect();
    console.log(" [*] connect prisma");
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    console.log(" [*] disconnect prisma (error)");
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log(" [*] disconnect prisma");
  }
})();
