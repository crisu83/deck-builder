import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

const defaultArgs = { include: { cards: true } };

export async function createDeck(body: Prisma.DeckCreateInput) {
  const args = { data: body, ...defaultArgs };

  console.log(`create deck (args=${JSON.stringify(args)})`);

  return prisma.deck.create(args);
}

export async function updateDeck(id: string, body: Prisma.DeckUpdateInput) {
  const args = { where: { id }, data: body, ...defaultArgs };

  console.log(`update deck (args=${JSON.stringify(args)})`);

  return prisma.deck.update(args);
}

export async function listDecks() {
  const args = { ...defaultArgs };

  console.log(`list decks (args=${JSON.stringify(args)})`);

  return prisma.deck.findMany(args);
}

export async function getDeck(id: string) {
  const args = { where: { id }, ...defaultArgs };

  console.log(`get deck (args=${JSON.stringify(args)})`);

  return prisma.deck.findFirst(args);
}
