import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import {
  ErrorResponse,
  getDeck,
  GetResponse,
  handleError,
  parseQuery,
  updateDeck,
  UpdateResponse,
} from "../../../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateResponse<Deck> | GetResponse<Deck> | ErrorResponse>
) {
  const deckId = parseQuery("deckId", req);

  switch (req.method) {
    case "PUT":
      try {
        return res
          .status(200)
          .json({ data: await updateDeck(deckId, req.body) });
      } catch (err) {
        return handleError(err, res);
      }
    case "GET":
      try {
        return res.status(200).json({ data: await getDeck(deckId) });
      } catch (err) {
        return handleError(err, res);
      }
    default:
      return res.status(405).json({ message: "Method not allowed." });
  }
}
