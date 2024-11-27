"use client";

import ControlledNumberInput from "@/components/ControlledNumberInput";
import MagicCard from "@/components/MagicCard/MagicCard";
import { Card } from "@/utilities/magic_types";
import { shuffleArray } from "@/utilities/utility_functions";
import { RepeatIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CARDS_PER_PACK = 15;

const RandomPack = ({ cards }: { cards: Card[] }) => {
  const [cardsPerPack, setCardsPerPack] = useState(CARDS_PER_PACK);
  const [counter, setCounter] = useState(0);
  const [pack, setPack] = useState<Card[]>([]);

  // TODO: check randomness
  useEffect(
    () => setPack(shuffleArray(cards).slice(0, cardsPerPack)),
    [counter, cards, cardsPerPack]
  );

  return (
    <div>
      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        mb="16px"
      >
        <Heading as="h2" size="lg">
          Random Pack
        </Heading>
        <Flex alignItems="flex-end" justifyContent="space-between" gap="16px">
          <ControlledNumberInput
            label="Cards Per Pack"
            name="cardsPerPack"
            value={cardsPerPack}
            updateValue={setCardsPerPack}
          />
          <IconButton
            aria-label="Randomize Pack"
            size="lg"
            icon={<RepeatIcon />}
            onClick={() => setCounter(counter + 1)}
          />
        </Flex>
      </Flex>
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 5, xl: 8 }}
        spacing="4px"
      >
        {pack.map((card) => (
          <MagicCard card={card} key={card.name} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default RandomPack;
