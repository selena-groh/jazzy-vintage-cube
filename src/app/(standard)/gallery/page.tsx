import GalleryView from "./GalleryView";
import { processCard } from "@/utilities/process_card";
import { gallerySort } from "@/utilities/sorting_algorithms";
import { Card, RawCard } from "@/utilities/magic_types";

export default async function Page() {
  const data = await fetch(process.env.CARD_DATA_JSON_URL!);
  const rawCards: RawCard[] = await data.json();
  const cards: Card[] = rawCards.map(processCard);
  const sortedCards = cards.sort(gallerySort);

  return <GalleryView cards={sortedCards} />;
}
