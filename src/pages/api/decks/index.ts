import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import {
  CreateResponse,
  ErrorResponse,
  methodNotAllowed,
  QueryResponse,
} from "@app/api/rest";
import { DeckRepository } from "@app/deck/deck-repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    CreateResponse<Deck> | QueryResponse<Deck> | ErrorResponse
  >
) {
  const deckRepo = new DeckRepository();

  switch (req.method) {
    case "POST":
      return res.status(201).json({ data: await deckRepo.create(req.body) });
    case "GET":
      return res.status(200).json({ data: await deckRepo.findMany() });
    default:
      return methodNotAllowed(res);
  }
}
