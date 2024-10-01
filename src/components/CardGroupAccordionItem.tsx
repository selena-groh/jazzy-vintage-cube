import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import MagicCardBadge from "@/components/MagicCardBadge";
import { defaultTableSort } from "@/utilities/magic_helpers";
import { Card } from "@/utilities/magic_types";
import Link from "next/link";

const CardGroupAccordionItem = ({
  title,
  cards,
}: {
  title: string;
  cards: Card[];
}) => {
  const sortedCards = cards?.sort(defaultTableSort);
  return (
    <AccordionItem>
      <h3>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel pb={4}>
        <Link
          href={{
            pathname: "/pack",
            query: {
              cards: "search",
            },
          }}
        >
          View All
        </Link>
        <Box as="ol" px={6} py={2}>
          {sortedCards.map(
            (card) =>
              card && (
                <li key={`${title}-${card?.name}`}>
                  <MagicCardBadge card={card} />
                </li>
              )
          )}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CardGroupAccordionItem;
