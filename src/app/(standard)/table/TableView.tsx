"use client";

import MagicCardCell from "@/components/MagicCardCell";
import { countGroup, DeepSorted, sortDeep } from "@/utilities/deep_sort";
import { Card, Color } from "@/utilities/magic_types";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useMemo } from "react";

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

const TableView = ({ cards }: { cards: Card[] }) => {
  // TODO: add sort configuration & filter
  const sorted = useMemo(
    () =>
      sortDeep(
        cards,
        true,
        "Alphabetical",
        "Color Category",
        "Types-Multicolor",
        "Mana Value"
      ),
    [cards]
  );
  return (
    <div>
      <Heading as="h2" size="lg">
        Table View ({cards.length} cards)
      </Heading>
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: sorted.length }}
        spacingY="8px"
      >
        {sorted.map((value) => {
          const [columnLabel, column]: [string, DeepSorted] = value;
          return (
            <Box key={columnLabel}>
              <Box backgroundColor={COLOR_TO_BACKGROUND_COLOR[columnLabel]}>
                <Heading as="h3" size="md" py="4px" textAlign="center">
                  {columnLabel} ({countGroup(column)})
                </Heading>
                {column.map((value) => {
                  const [label, group]: [string, DeepSorted] = value;
                  return (
                    <Box key={label} px="4px">
                      <Text
                        backgroundColor="white"
                        px="4px"
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        {label}
                      </Text>
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap="2px"
                        px="4px"
                        py="4px"
                      >
                        {group.map((value, index) => {
                          const [label, cards]: [string, Card[]] = value;
                          return (
                            <div key={label}>
                              {cards.map((card) => (
                                <MagicCardCell card={card} key={card.name} />
                              ))}
                              {index !== group.length - 1 && (
                                <hr
                                  style={{
                                    marginTop: "4px",
                                    borderColor: "gray",
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default TableView;
