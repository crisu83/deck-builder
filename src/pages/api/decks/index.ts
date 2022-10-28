import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import { createDeck, listDecks } from "../../../api/decks";

type CreateData = { data: Deck };
type ListData = { data: Deck[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateData | ListData>
) {
  switch (req.method) {
    case "POST":
      return res.status(201).json({ data: await createDeck(req.body) });
    case "GET":
    default:
      return res.status(200).json({ data: await listDecks() });
  }
}
