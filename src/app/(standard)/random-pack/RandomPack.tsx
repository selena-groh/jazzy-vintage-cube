"use client";

import React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import MagicCard from "@/components/MagicCard";
import { Card } from "@/utilities/magic_types";
import { shuffleArray } from "@/utilities/magic_helpers";

const RandomPack = ({ cards }: { cards: Card[] }) => {
  // TODO: check randomness
  const pack = shuffleArray(cards).slice(0, 15);
  return (
    <div>
      <Heading as="h2" size="lg">
        Random Pack
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
