import GalleryView from "./GalleryView";
import { getColorFromCard, sortCards } from "@/utilities/magic_helpers";
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
  const sortedCards = cards.sort(sortCards);

  return <GalleryView cards={sortedCards} />;
}
