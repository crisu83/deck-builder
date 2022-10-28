import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import { getDeck, updateDeck } from "../../../api/decks";

type UpdateData = { data: Deck };
type GetData = { data: Deck | null };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateData | GetData>
) {
  switch (req.method) {
    case "PUT":
      return res
        .status(200)
        .json({ data: await updateDeck(req.query.deckId as string, req.body) });
    case "GET":
    default:
      return res
        .status(200)
        .json({ data: await getDeck(req.query.deckId as string) });
  }
}
