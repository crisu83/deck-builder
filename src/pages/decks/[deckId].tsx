import { useRouter } from "next/router";

import { DeckScreen } from "@app/deck/deck-screen";

export default function DeckPage() {
  const router = useRouter();
  const deckId = router.query.deckId as string;
  return deckId ? <DeckScreen deckId={deckId} /> : null;
}
