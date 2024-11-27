import "server-only";
import MagicCard from "@/components/MagicCard/MagicCard";
import { Card } from "@/utilities/magic_types";
import GalleryViewClient from "./GalleryView.client";

const GalleryView = ({ cards }: { cards: Card[] }) => {
  // TODO: add sort & filter
  // TODO: add hover card
  return (
    <GalleryViewClient numCards={cards.length}>
      {cards.map((card) => (
        <MagicCard card={card} key={card.name} />
      ))}
    </GalleryViewClient>
  );
};

export default GalleryView;
