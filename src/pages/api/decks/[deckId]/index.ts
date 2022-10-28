import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import {
  ErrorResponse,
  GetResponse,
  handleError,
  methodNotAllowed,
  parseQuery,
  UpdateResponse,
} from "@app/api/rest";
import { DeckRepository } from "@app/deck/deck-repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateResponse<Deck> | GetResponse<Deck> | ErrorResponse>
) {
  const deckId = parseQuery("deckId", req);
  const deckRepo = new DeckRepository();

  switch (req.method) {
    case "PUT":
      try {
        const input = req.body;
        return res
          .status(200)
          .json({ data: await deckRepo.update(deckId, input) });
      } catch (err) {
        return handleError(err, res);
      }
    case "GET":
      try {
        return res.status(200).json({ data: await deckRepo.findOne(deckId) });
      } catch (err) {
        return handleError(err, res);
      }
    default:
      return methodNotAllowed(res);
  }
}
