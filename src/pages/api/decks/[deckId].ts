import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import {
  ErrorResponse,
  getDeck,
  GetResponse,
  updateDeck,
  UpdateResponse,
} from "../../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateResponse<Deck> | GetResponse<Deck> | ErrorResponse>
) {
  const deckId = Array.isArray(req.query.deckId)
    ? req.query.deckId[0]
    : req.query.deckId!;

  switch (req.method) {
    case "PUT":
      return res.status(200).json({ data: await updateDeck(deckId, req.body) });
    case "GET":
      return res.status(200).json({ data: await getDeck(deckId) });
    default:
      return res.status(404).json({ message: "Page not found." });
  }
}
