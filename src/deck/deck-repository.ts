import { Deck, Prisma } from "@prisma/client";
import { Repository } from "@app/interfaces/repository";
import { prisma } from "@app/prisma";

export class DeckRepository implements Repository<Deck> {
  async create(input: Prisma.DeckCreateInput) {
    return prisma.deck.create({ data: input, include: { cards: true } });
  }

  async update(id: string, input: Prisma.DeckUpdateInput) {
    return prisma.deck.update({
      where: { id },
      data: input,
      include: { cards: true },
    });
  }

  async delete(id: string) {
    return prisma.deck.delete({ where: { id }, include: { cards: true } });
  }

  async findOne(id: string) {
    return prisma.deck.findUnique({
      where: { id },
      include: { cards: true },
    });
  }

  async findMany() {
    return prisma.deck.findMany({
      include: { cards: true },
    });
  }
}
