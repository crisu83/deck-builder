import { Card, Prisma } from "@prisma/client";
import { Repository } from "@app/interfaces/repository";
import { prisma } from "@app/prisma";

export class CardRepository implements Repository<Card> {
  async create(input: Prisma.CardCreateInput) {
    return prisma.card.create({ data: input });
  }

  async update(id: string, input: Prisma.CardUpdateInput) {
    return prisma.card.update({ where: { id }, data: input });
  }

  async delete(id: string) {
    return prisma.card.delete({ where: { id } });
  }

  async findOne(id: string) {
    return prisma.card.findFirst({ where: { id } });
  }

  async findMany() {
    return prisma.card.findMany({});
  }
}
