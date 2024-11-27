import "server-only";
import MagicCardCell from "@/components/MagicCardCell";
import { countGroup, DeepSorted } from "@/utilities/deep_sort";
import { Card, Color } from "@/utilities/magic_types";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";

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

const TableView = ({
  numCards,
  sorted,
}: {
  numCards: number;
  sorted: DeepSorted;
}) => {
  // TODO: add sort configuration & filter
  return (
    <div>
      <Heading as="h2" size="lg">
        Table View ({numCards} cards)
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
                <ul>
                  {column.map((value) => {
                    const [label, group]: [string, DeepSorted] = value;
                    return (
                      <Box as="li" key={label} px="4px">
                        <Text
                          as="h4"
                          backgroundColor="white"
                          px="4px"
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          {label} ({countGroup(group)})
                        </Text>
                        <Box
                          as="ul"
                          display="flex"
                          flexDirection="column"
                          gap="2px"
                          px="4px"
                          py="4px"
                        >
                          {group.map((value, index) => {
                            const [label, cards]: [string, Card[]] = value;
                            return (
                              <li key={label}>
                                {/* TODO: may need to make label more flexible */}
                                <ul aria-label={`Mana Value ${label}`}>
                                  {cards.map((card) => (
                                    <MagicCardCell
                                      card={card}
                                      key={card.name}
                                    />
                                  ))}
                                </ul>
                                {index !== group.length - 1 && (
                                  <hr
                                    style={{
                                      marginTop: "4px",
                                      borderColor: "gray",
                                    }}
                                  />
                                )}
                              </li>
                            );
                          })}
                        </Box>
                      </Box>
                    );
                  })}
                </ul>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default TableView;
