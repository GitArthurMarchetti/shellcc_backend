import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Limpar o banco de dados antes de cada teste
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
