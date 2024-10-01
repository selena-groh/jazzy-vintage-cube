import TableView from "./TableView";
import {
  bucketCardsByColor,
  getColorFromCard,
} from "@/utilities/magic_helpers";
import { Card, RawCard } from "@/utilities/types";

export default async function Page() {
  const data = await fetch(
    "https://jjkv.github.io/jazzy_vintage_cube_images/json/cube.json"
  );
  const rawCards: RawCard[] = await data.json();
  const cards: Card[] = rawCards.map((card) => ({
    ...card,
    color: getColorFromCard(card),
  }));
  const bucketedCards = bucketCardsByColor(cards);

  return <TableView bucketedCards={bucketedCards} />;
}
