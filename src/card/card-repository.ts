import { Card, Prisma } from "@prisma/client";
import { Repository } from "@app/interfaces/repository";
import { prisma } from "@app/prisma";

export class CardRepository implements Repository<Card> {
  create(input: Prisma.CardCreateInput) {
    const args: Prisma.CardCreateArgs = { data: input };

    console.log(` [*] create card (args=${JSON.stringify(args)})`);

    return prisma.card.create(args);
  }

  update(id: string, input: Prisma.CardUpdateInput) {
    const args: Prisma.CardUpdateArgs = {
      where: { id },
      data: input,
    };

    console.log(`[*] update card (args=${JSON.stringify(args)})`);

    return prisma.card.update(args);
  }

  delete(id: string) {
    const args: Prisma.CardDeleteArgs = { where: { id } };

    console.log(` [*] delete card (args=${JSON.stringify(args)})`);

    return prisma.card.delete(args);
  }

  findOne(id: string) {
    const args: Prisma.CardFindFirstArgs = { where: { id } };

    console.log(` [*] find first card (args=${JSON.stringify(args)})`);

    return prisma.card.findFirst(args);
  }

  findMany() {
    const args: Prisma.CardFindManyArgs = {};

    console.log(` [*] find many cards (args=${JSON.stringify(args)})`);

    return prisma.card.findMany(args);
  }
}
