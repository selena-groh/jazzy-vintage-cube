"use client";

import {
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

const enum SIZE {
  "SMALL" = "SMALL",
  "MEDIUM" = "MEDIUM",
  "LARGE" = "LARGE",
}

const COLUMNS_BY_SIZE = {
  [SIZE.SMALL]: { base: 2, sm: 2, md: 4, lg: 5, xl: 8 },
  [SIZE.MEDIUM]: { base: 2, sm: 2, md: 3, lg: 4, xl: 6 },
  [SIZE.LARGE]: { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
};

const GalleryViewClient = ({ numCards, children }) => {
  const [selectedSize, setSelectedSize] = useState<SIZE>(SIZE.SMALL);
  // TODO: add sort & filter
  return (
    <div>
      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        mb="16px"
      >
        <Heading as="h2" size="lg">
          Gallery View ({numCards} cards)
        </Heading>
        <RadioGroup
          colorScheme="yellow"
          value={selectedSize}
          onChange={(value: SIZE) => setSelectedSize(value)}
        >
          <Stack spacing={4} direction="row">
            <Radio size="lg" value={SIZE.SMALL}>
              Small
            </Radio>
            <Radio size="lg" value={SIZE.MEDIUM}>
              Medium
            </Radio>
            <Radio size="lg" value={SIZE.LARGE}>
              Large
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <SimpleGrid columns={COLUMNS_BY_SIZE[selectedSize]} spacing="4px">
        {children}
      </SimpleGrid>
    </div>
  );
};

export default GalleryViewClient;
