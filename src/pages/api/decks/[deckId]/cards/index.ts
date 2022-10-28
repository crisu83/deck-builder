import type { NextApiRequest, NextApiResponse } from "next";

import { Card } from "@prisma/client";
import {
  addCard,
  CreateResponse,
  ErrorResponse,
  parseQuery,
} from "../../../../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateResponse<Card> | ErrorResponse>
) {
  const deckId = parseQuery("deckId", req);

  switch (req.method) {
    case "POST":
      return res.status(200).json({ data: await addCard(deckId, req.body) });
    default:
      return res.status(405).json({ message: "Method not allowed." });
  }
}
