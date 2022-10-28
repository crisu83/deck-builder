import Link from "next/link";

import { DeckWithCards } from "@app/deck/types";
import { useQuery } from "@app/hooks/use-query";
import { Screen, Content, Footer } from "@app/components/layout";
import { Loader } from "@app/components/loader";
import {
  Table,
  TableBody,
  TableHeading,
  TableRow,
} from "@app/components/table";

export default function HomePage() {
  const { loading, data } = useQuery<DeckWithCards[]>("/api/decks");

  return (
    <Screen>
      <Content>
        <h1 className="mb-8 text-6xl">Deck Builder</h1>
        <Loader loading={loading}>
          {data && (
            <Table>
              <thead>
                <tr>
                  <TableHeading className="w-5/6">Name</TableHeading>
                  <TableHeading className="w-1/6"># Cards</TableHeading>
                </tr>
              </thead>
              <TableBody>
                {data.map((deck) => (
                  <tr key={deck.id}>
                    <TableRow>
                      <Link href={`decks/${deck.id}`}>{deck.name}</Link>
                    </TableRow>
                    <TableRow>{deck.cards.length}</TableRow>
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
