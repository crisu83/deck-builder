import { Card, Deck } from "@prisma/client";

export type DeckWithCards = Deck & { cards: Card[] };
