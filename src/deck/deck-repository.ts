import { Deck, Prisma } from "@prisma/client";
import { Repository } from "@app/interfaces/repository";
import { prisma } from "@app/prisma";

export class DeckRepository implements Repository<Deck> {
  create(input: Prisma.DeckCreateInput) {
    const args: Prisma.DeckCreateArgs = { data: input };

    console.log(` [*] create deck (args=${JSON.stringify(args)})`);

    return prisma.deck.create(args);
  }

  update(id: string, input: Prisma.DeckUpdateInput) {
    const args: Prisma.DeckUpdateArgs = {
      where: { id },
      data: input,
    };

    console.log(`[*] update deck (args=${JSON.stringify(args)})`);

    return prisma.deck.update(args);
  }

  delete(id: string) {
    const args: Prisma.DeckDeleteArgs = { where: { id } };

    console.log(` [*] delete deck (args=${JSON.stringify(args)})`);

    return prisma.deck.delete(args);
  }

  findOne(id: string) {
    const args: Prisma.DeckFindFirstArgs = {
      where: { id },
      include: { cards: true },
    };

    console.log(` [*] find first deck (args=${JSON.stringify(args)})`);

    return prisma.deck.findFirst(args);
  }

  findMany() {
    const args: Prisma.DeckFindManyArgs = {};

    console.log(` [*] find many decks (args=${JSON.stringify(args)})`);

    return prisma.deck.findMany(args);
  }
}
