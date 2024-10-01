"use client";

import React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { CardBuckets, Color } from "@/utilities/magic_types";
import MagicCardCell from "@/components/MagicCardCell";
import { defaultTableSort } from "@/utilities/sorting_algorithms";

const COLOR_TO_BACKGROUND_COLOR: { [key in Color]: string } = {
  [Color.White]: "#FBF8CC",
  [Color.Blue]: "#CBE8FF",
  [Color.Black]: "#d6cbd6",
  [Color.Red]: "#FFCFD2",
  [Color.Green]: "#e9ffd4",
  [Color.Multicolored]: "#FDE4CF",
  [Color.Colorless]: "#e9e7eb",
  [Color.Land]: "#ffe0c0",
};

const TableView = ({ bucketedCards }: { bucketedCards: CardBuckets }) => {
  const bucketKeys = Object.keys(bucketedCards) as Color[];
  return (
    <div>
      <Heading as="h2" size="lg">
        Table View
      </Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: bucketKeys.length }}
        spacingY="8px"
      >
        {bucketKeys.map((bucketKey) => {
          const cardsInBucket = bucketedCards[bucketKey].sort(defaultTableSort);
          return (
            <Box key={bucketKey}>
              <Box
                p="8px"
                backgroundColor={COLOR_TO_BACKGROUND_COLOR[bucketKey]}
              >
                <Heading as="h3" size="md">
                  {bucketKey} ({cardsInBucket.length})
                </Heading>
                <Box display="flex" flexDirection="column" gap="2px">
                  {cardsInBucket.map((card) => (
                    // TODO: add hover image
                    <MagicCardCell card={card} key={card.name} />
                  ))}
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default TableView;
