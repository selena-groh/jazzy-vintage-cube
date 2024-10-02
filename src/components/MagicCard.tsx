import { Card, Color } from "@/utilities/magic_types";
import { Badge } from "@chakra-ui/react";
import Image from "next/image";

const COLOR_TO_BADGE_COLOR: { [key in Color]: string } = {
  [Color.White]: "gray",
  [Color.Blue]: "blue",
  [Color.Black]: "gray",
  [Color.Red]: "red",
  [Color.Green]: "green",
  [Color.Multicolored]: "yellow",
  [Color.Colorless]: "blackAlpha",
  [Color.Land]: "purple",
};

const MagicCard = ({ card }: { card: Card }) => {
  return card.image ? (
    <Image alt={card.name} src={card.image} width={375} height={523} />
  ) : (
    <Badge
      variant={card.color === Color.White ? "outline" : "solid"}
      colorScheme={COLOR_TO_BADGE_COLOR[card.color]}
      textTransform="initial"
    >
      {card.name}
      {card.color})
    </Badge>
  );
};

export default MagicCard;
