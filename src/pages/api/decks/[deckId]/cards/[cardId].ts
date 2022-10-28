import type { NextApiRequest, NextApiResponse } from "next";

import { Card } from "@prisma/client";
import {
  DeleteResponse,
  ErrorResponse,
  handleError,
  methodNotAllowed,
  parseQuery,
} from "@app/api/rest";
import { CardRepository } from "@app/card/card-repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse<Card> | ErrorResponse>
) {
  const cardId = parseQuery("cardId", req);
  const cardRepo = new CardRepository();

  switch (req.method) {
    case "DELETE":
      try {
        return res.status(200).json({ data: await cardRepo.delete(cardId) });
      } catch (err) {
        return handleError(err, res);
      }
    case "PUT":
      try {
        const input = req.body;
        return res
          .status(200)
          .json({ data: await cardRepo.update(cardId, input) });
      } catch (err) {
        return handleError(err, res);
      }
    default:
      return methodNotAllowed(res);
  }
}
