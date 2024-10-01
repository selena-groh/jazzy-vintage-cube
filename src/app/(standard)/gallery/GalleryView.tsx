"use client";

import React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import MagicCard from "@/components/MagicCard";
import { Card } from "@/utilities/types";

const GalleryView = ({ cards }: { cards: Card[] }) => {
  return (
    <div>
      <Heading as="h2" size="lg">
        Gallery View
      </Heading>
      {/* TODO: add ability to pick card size */}
      {/* TODO: add hover image */}
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 4, lg: 5, xl: 7 }}
        spacing="4px"
      >
        {cards.map((card) => (
          <MagicCard card={card} key={card.name} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GalleryView;
