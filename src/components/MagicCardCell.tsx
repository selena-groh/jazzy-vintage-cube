import { Card } from "@/utilities/magic_types";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { Lightbox } from "react-modal-image";

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
      </Text>
      {/* TODO: add up/down arrow */}
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
