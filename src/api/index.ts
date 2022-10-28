import { NextApiRequest, NextApiResponse } from "next";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export type SuccessResponse<T> = { data: T };
export type ErrorResponse = { message: string };

export type CreateResponse<T> = SuccessResponse<T>;
export type UpdateResponse<T> = SuccessResponse<T>;
export type GetResponse<T> = SuccessResponse<T | null>;
export type QueryResponse<T> = SuccessResponse<T[]>;
export type DeleteResponse<T> = SuccessResponse<T>;

export async function createDeck(data: Prisma.DeckCreateInput) {
  const args: Prisma.DeckCreateArgs = { data, include: { cards: true } };

  console.log(`create deck (args=${JSON.stringify(args)})`);

  return prisma.deck.create(args);
}

export async function updateDeck(deckId: string, data: Prisma.DeckUpdateInput) {
  const args: Prisma.DeckUpdateArgs = {
    where: { id: deckId },
    data,
    include: { cards: true },
  };

  console.log(`update deck (args=${JSON.stringify(args)})`);

  return prisma.deck.update(args);
}

export async function queryDecks() {
  const args: Prisma.DeckFindManyArgs = { include: { cards: true } };

  console.log(`query decks (args=${JSON.stringify(args)})`);

  return prisma.deck.findMany(args);
}

export async function getDeck(deckId: string) {
  const args: Prisma.DeckFindFirstArgs = {
    where: { id: deckId },
    include: { cards: true },
  };

  console.log(`get deck (args=${JSON.stringify(args)})`);

  return prisma.deck.findFirst(args);
}

export async function addCard(deckId: string, data: Prisma.CardCreateInput) {
  const args: Prisma.CardCreateArgs = {
    data: { ...data, deck: { connect: { id: deckId } } },
  };

  console.log(`add card to deck (args=${JSON.stringify(args)})`);

  return prisma.card.create(args);
}

export async function updateCard(cardId: string, data: Prisma.CardUpdateInput) {
  const args: Prisma.CardUpdateArgs = {
    where: { id: cardId },
    data,
  };

  console.log(`update card (args=${JSON.stringify(args)})`);

  return prisma.card.update(args);
}

export async function removeCard(cardId: string) {
  const args: Prisma.CardDeleteArgs = { where: { id: cardId } };

  console.log(`remove card from deck (args=${JSON.stringify(args)})`);

  return prisma.card.delete(args);
}

export function parseQuery(key: string, req: NextApiRequest): string {
  const value = req.query[key]!;
  return Array.isArray(value) ? value[0] : value;
}

export function handleError(err: unknown, res: NextApiResponse) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(500).json({ message: parseErrorMessage(err) });
  }
  throw err;
}

export function parseErrorMessage(err: Prisma.PrismaClientKnownRequestError) {
  return err.meta?.cause ?? "Internal server error.";
}
