import { Badge, Box, Text } from "@chakra-ui/react";
import { Card, Color, TypeCategory } from "@/utilities/magic_types";
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

const MagicCardCell = ({ card }: { card: Card }) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <div>
      <Text
        fontSize="xs"
        cursor={card.image ? "pointer" : undefined}
        onClick={() => {
          if (card.image) {
            setShowImage(true);
          }
        }}
      >
        {card.name}
        {card.typeCategory !== TypeCategory.Land
          ? ` (${card.manaValue}, ${card.typeCategory})`
          : ""}
      </Text>
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

export default MagicCardCell;
