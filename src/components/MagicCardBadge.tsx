import { Badge } from "@chakra-ui/react";
import { Card, Color } from "@/utilities/types";
import { Lightbox } from "react-modal-image";
import { useState } from "react";

const COLOR_TO_BADGE_COLOR: { [key in Color]: string } = {
  [Color.White]: "gray",
  [Color.Blue]: "blue",
  [Color.Black]: "gray",
  [Color.Red]: "red",
  [Color.Green]: "green",
  [Color.Multicolored]: "yellow",
  [Color.Colorless]: "blackAlpha",
  [Color.Land]: "purple",
};

const MagicCardBadge = ({ card }: { card: Card }) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <div>
      <Badge
        variant={card.color === Color.White ? "outline" : "solid"}
        colorScheme={COLOR_TO_BADGE_COLOR[card.color]}
        textTransform="initial"
        whiteSpace="wrap"
        cursor={card.image ? "pointer" : undefined}
        onClick={() => {
          if (card.image) {
            setShowImage(true);
          }
        }}
      >
        {card.name}
        {/* ({card.indexNumber ? `#${card.indexNumber} ` : ""}
        {card.color}) */}
      </Badge>
      {card.image && showImage && (
        <Lightbox
          large={card.image}
          alt={card.name}
          onClose={() => setShowImage(false)}
          imageBackgroundColor="white"
        />
      )}
    </div>
  );
};

export default MagicCardBadge;
