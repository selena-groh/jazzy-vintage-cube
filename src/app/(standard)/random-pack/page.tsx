import RandomPack from "./RandomPack";
import { processCard } from "@/utilities/magic_helpers";
import { Card, RawCard } from "@/utilities/magic_types";

export default async function Page() {
  const data = await fetch(process.env.CARD_DATA_JSON_URL!);
  const rawCards: RawCard[] = await data.json();
  const cards: Card[] = rawCards.map(processCard);

  return <RandomPack cards={cards} />;
}
