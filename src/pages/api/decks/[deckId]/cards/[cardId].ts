import type { NextApiRequest, NextApiResponse } from "next";

import { Card } from "@prisma/client";
import {
  DeleteResponse,
  ErrorResponse,
  handleError,
  parseQuery,
  removeCard,
  updateCard,
} from "../../../../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse<Card> | ErrorResponse>
) {
  const cardId = parseQuery("cardId", req);

  switch (req.method) {
    case "DELETE":
      try {
        return res.status(200).json({ data: await removeCard(cardId) });
      } catch (err) {
        return handleError(err, res);
      }
    case "PUT":
      try {
        return res
          .status(200)
          .json({ data: await updateCard(cardId, req.body) });
      } catch (err) {
        return handleError(err, res);
      }
    default:
      return res.status(405).json({ message: "Method not allowed." });
  }
}
