import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import {
  createDeck,
  CreateResponse,
  ErrorResponse,
  queryDecks,
  QueryResponse,
} from "../../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    CreateResponse<Deck> | QueryResponse<Deck> | ErrorResponse
  >
) {
  switch (req.method) {
    case "POST":
      return res.status(201).json({ data: await createDeck(req.body) });
    case "GET":
      return res.status(200).json({ data: await queryDecks() });
    default:
      return res.status(404).json({ message: `Page not found.` });
  }
}
