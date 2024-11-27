"use client";

import { Card } from "@/utilities/magic_types";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { Lightbox } from "react-modal-image";
import withAutocard from "./Autocard/withAutocard";

const AutocardDiv = withAutocard("div");

const MagicCardCell = ({ card }: { card: Card }) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <AutocardDiv card={card}>
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
      {/* TODO: add up/down arrow to navigate through cards*/}
      {card.image && showImage && (
        <Lightbox
          large={card.image}
          alt={card.name}
          onClose={() => setShowImage(false)}
          imageBackgroundColor="white"
        />
      )}
    </AutocardDiv>
  );
};

export default MagicCardCell;
