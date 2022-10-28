import { useRouter } from "next/router";

import { DeckWithCards } from "@app/deck/types";
import { useQuery } from "@app/hooks/use-query";
import { Content, Footer, Screen } from "@app/components/layout";
import { Loader } from "@app/components/loader";
import {
  Table,
  TableBody,
  TableHeading,
  TableRow,
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
                  <TableHeading>Title</TableHeading>
                  <TableHeading>Type</TableHeading>
                  <TableHeading>Set</TableHeading>
                  <TableHeading>Quantity</TableHeading>
                </tr>
              </thead>
              <TableBody>
                {data.cards.map((card) => (
                  <tr key={card.id}>
                    <TableRow>{card.title}</TableRow>
                    <TableRow>{card.type}</TableRow>
                    <TableRow>{card.set}</TableRow>
                    <TableRow>{card.quantity}</TableRow>
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
