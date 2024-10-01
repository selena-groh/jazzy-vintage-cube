"use client";

import React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import MagicCard from "@/components/MagicCard";
import { Card } from "@/utilities/magic_types";

const RandomPack = ({ cards }: { cards: Card[] }) => {
  // TODO: actually generate random pack
  const pack = cards.slice(0, 15);
  return (
    <div>
      <Heading as="h2" size="lg">
        Random Pack (not implemented yet)
      </Heading>
      {/* TODO: add input to select number of cards */}
      <SimpleGrid columns={{ sm: 2, md: 4, lg: 5, xl: 6 }} spacing="4px">
        {pack.map((card) => (
          <MagicCard card={card} key={card.name} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default RandomPack;
