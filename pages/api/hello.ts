// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Deck } from "@prisma/client";
import { connect } from "../../prisma";

type Data = {
  decks: Deck[];
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = await connect();

  await prisma.deck.create({
    data: {
      name: "Giratina V STAR",
      cards: {
        create: [
          {
            title: "Comfey",
            set: "LOR",
            quantity: 4,
          },
          {
            title: "Giratina V",
            set: "LOR",
            quantity: 3,
          },
          {
            title: "Giratina V STAR",
            set: "LOR",
            quantity: 3,
          },
        ],
      },
    },
  });

  const decks = await prisma.deck.findMany({ include: { cards: true } });

  res.status(200).json({ decks });
}
