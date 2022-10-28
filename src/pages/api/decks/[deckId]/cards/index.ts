import type { NextApiRequest, NextApiResponse } from "next";

import { Card } from "@prisma/client";
import {
  CreateResponse,
  ErrorResponse,
  methodNotAllowed,
  parseQuery,
} from "@app/api/rest";
import { CardRepository } from "@app/card/card-repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateResponse<Card> | ErrorResponse>
) {
  const deckId = parseQuery("deckId", req);
  const cardRepo = new CardRepository();

  switch (req.method) {
    case "POST":
      const input = {
        ...req.body,
        deck: { connect: { id: deckId } },
      };
      return res.status(200).json({
        data: await cardRepo.create(input),
      });
    default:
      return methodNotAllowed(res);
  }
}
