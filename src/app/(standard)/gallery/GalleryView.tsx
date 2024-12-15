import MagicCard from "@/components/MagicCard/MagicCard";
import { Card } from "@/utilities/magic_types";
import "server-only";
import GalleryViewClient from "./GalleryView.client";

const ABOVE_THE_FOLD_THRESHOLD = 16;

const GalleryView = ({ cards }: { cards: Card[] }) => {
  // TODO: add sort & filter
  // TODO: add hover card
  return (
    <GalleryViewClient numCards={cards.length}>
      {cards.map((card, index) => (
        <MagicCard
          card={card}
          key={card.name}
          imagePriority={index < ABOVE_THE_FOLD_THRESHOLD}
        />
      ))}
    </GalleryViewClient>
  );
};

export default GalleryView;
