import { PrismaClient } from "@prisma/client";

export async function connect() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }

  return prisma;
}
