import { HTMLProps, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Card } from "@prisma/client";
import { DeckWithCards } from "@app/deck/types";
import { useMutation } from "@app/hooks/use-mutation";
import { useQuery } from "@app/hooks/use-query";
import { Content, Footer, Screen } from "@app/components/layout";
import { Loader } from "@app/components/loader";
import {
  Table,
  TableBody,
  TableHeaderCell,
  TableDataCell,
  TableRow,
  TableHead,
} from "@app/components/table";
import { FormField } from "../components/form";
import { useOnKeyDown } from "../hooks/use-on-key-down";

type DeckScreenProps = { deckId: string };

export function DeckScreen({ deckId }: DeckScreenProps) {
  const { loading, data: deck } = useQuery<DeckWithCards>(
    `/api/decks/${deckId}`
  );
  const createCardMutation = useMutation<Card>(`/api/decks/${deckId}/cards`);
  const [data, setData] = useState(deck);
  const [showForm, setShowForm] = useState(false);
  const { register, setFocus, handleSubmit, reset } = useForm();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setData(deck);
  }, [deck]);

  useEffect(() => {
    if (showForm) {
      setFocus(fields[0].name);
    }
  }, [setFocus, showForm]);

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

  const onSubmit = async (input: unknown) => {
    setShowForm(false);
    const newCard = await createCardMutation(input);
    setData((prevDeck) =>
      prevDeck
        ? {
            ...prevDeck,
            cards: [...prevDeck.cards, newCard],
          }
        : undefined
    );
    reset();
  };

  const onError = (err: unknown) => {
    console.error(err);
  };

  return (
    <Screen>
      <Content>
        <h1 className="mb-8 text-6xl">Deck Builder</h1>
        <Loader loading={loading}>
          {data ? (
            <div className="flex flex-col">
              <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {fields.map((field) => (
                        <TableHeaderCell key={field.name}>
                          {field.name}
                        </TableHeaderCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.cards.map((card) => (
                      <CardRow key={card.id} card={card} />
                    ))}
                    {showForm ? (
                      <TableRow>
                        {fields.map((field, index) => (
                          <TableDataCell key={field.name} className="py-3">
                            <FormField
                              tabIndex={index + 1}
                              placeholder={field.placeholder}
                              {...register(field.name, field.options)}
                            />
                          </TableDataCell>
                        ))}
                      </TableRow>
                    ) : null}
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
                  Add card
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

type CardRowProps = { card: Card } & HTMLProps<HTMLTableRowElement>;

function CardRow({ card, ...props }: CardRowProps) {
  return (
    <TableRow {...props}>
      {fields.map((field) => (
        <TableDataCell key={field.name}>
          {card[field.name as never]}
        </TableDataCell>
      ))}
    </TableRow>
  );
}

const fields = [
  { name: "title", placeholder: "Title", options: { required: true } },
  { name: "type", placeholder: "Type", options: { required: true } },
  { name: "set", placeholder: "Set", options: { required: true } },
  {
    name: "quantity",
    placeholder: "Quantity",
    options: { required: true, valueAsNumber: true },
  },
];
