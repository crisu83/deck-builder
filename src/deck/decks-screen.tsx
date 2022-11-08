import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DeckWithCards } from "@app/deck/types";
import { useMutation } from "@app/hooks/use-mutation";
import { useOnKeyDown } from "@app/hooks/use-on-key-down";
import { useQuery } from "@app/hooks/use-query";
import { Screen, Content, Footer } from "@app/components/layout";
import { Loader } from "@app/components/loader";
import {
  Table,
  TableBody,
  TableHeaderCell,
  TableDataCell,
  TableHead,
  TableRow,
} from "@app/components/table";

export function DecksScreen() {
  const { loading, data } = useQuery<DeckWithCards[]>("/api/decks");
  const createDeckMutation = useMutation<DeckWithCards>("/api/decks");
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (input: unknown) => {
    setShowForm(false);
    await createDeckMutation(input);
    reset();
  };

  const onError = (err: unknown) => {
    console.error(err);
  };

  useOnKeyDown((event) => {
    switch (event.key) {
      case "Enter":
        if (!showForm) {
          event.preventDefault();
          setShowForm(true);
        }
        break;
      case "Escape":
        if (showForm) {
          event.preventDefault();
          setShowForm(false);
          reset();
        }
        break;
      default:
    }
  });

  return (
    <Screen>
      <Content>
        <h1 className="mb-8 text-6xl">Deck Builder</h1>
        <Loader loading={!data && loading}>
          {data ? (
            <div className="flex flex-col">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Table className="mb-4">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="w-5/6">Name</TableHeaderCell>
                      <TableHeaderCell className="w-1/6">
                        # Cards
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((deck) => (
                      <TableRow key={deck.id}>
                        <TableDataCell>
                          <Link href={`decks/${deck.id}`}>{deck.name}</Link>
                        </TableDataCell>
                        <TableDataCell>{deck.cards.length}</TableDataCell>
                      </TableRow>
                    ))}
                    {showForm && (
                      <TableRow>
                        <TableDataCell className="py-3">
                          <input
                            {...register("name")}
                            type="text"
                            className="form-input p-0 py-1 w-full bg-transparent border-transparent focus:border-transparent focus:ring-0 border-b-slate-500 focus:border-b-slate-500 text-sm"
                          />
                        </TableDataCell>
                        <TableDataCell>&nbsp;</TableDataCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <input type="submit" hidden />
              </form>
              {!showForm && (
                <button
                  type="button"
                  className="p-4 justify-center uppercase"
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  Add deck
                </button>
              )}
            </div>
          ) : null}
        </Loader>
      </Content>
      <Footer />
    </Screen>
  );
}
