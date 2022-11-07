import { useRouter } from "next/router";

import { DeckWithCards } from "@app/deck/types";
import { useQuery } from "@app/hooks/use-query";
import { Content, Footer, Screen } from "@app/components/layout";
import { Loader } from "@app/components/loader";
import {
  Table,
  TableBody,
  TableHeaderCell,
  TableDataCell,
} from "@app/components/table";

export default function DeckPage() {
  const router = useRouter();
  const deckId = router.query.deckId;

  const { loading, data } = useQuery<DeckWithCards>(
    `/api/decks/${deckId}`,
    !!deckId
  );

  return (
    <Screen>
      <Content>
        <h1 className="mb-8 text-6xl">Deck Builder</h1>
        <Loader loading={loading}>
          {data && (
            <Table>
              <thead>
                <tr>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Set</TableHeaderCell>
                  <TableHeaderCell>Quantity</TableHeaderCell>
                </tr>
              </thead>
              <TableBody>
                {data.cards.map((card) => (
                  <tr key={card.id}>
                    <TableDataCell>{card.title}</TableDataCell>
                    <TableDataCell>{card.type}</TableDataCell>
                    <TableDataCell>{card.set}</TableDataCell>
                    <TableDataCell>{card.quantity}</TableDataCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          )}
        </Loader>
      </Content>
      <Footer />
    </Screen>
  );
}
