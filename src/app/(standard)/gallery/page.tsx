import GalleryView from "./GalleryView";
import { gallerySort, getColorFromCard } from "@/utilities/magic_helpers";
import { Card, RawCard } from "@/utilities/magic_types";

export default async function Page() {
  const data = await fetch(process.env.JSON_URL!);
  const rawCards: RawCard[] = await data.json();
  const cards: Card[] = rawCards.map((card) => ({
    ...card,
    color: getColorFromCard(card),
  }));
  const sortedCards = cards.sort(gallerySort);

  return <GalleryView cards={sortedCards} />;
}
