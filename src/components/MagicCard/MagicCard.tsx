import { Card, Color } from "@/utilities/magic_types";
import { Box, Text, VisuallyHidden } from "@chakra-ui/react";
import cx from "classnames";
import Image from "next/image";
import styles from "./MagicCard.module.css";

const WIDTH = 375;
const HEIGHT = 523;

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

const MagicCard = ({ card }: { card: Card }) => {
  return (
    <div
      className={cx({
        [styles.flipBox]: card.back?.image,
      })}
    >
      <div className={styles.flipBoxInner}>
        <div className={styles.flipBoxFront}>
          {/* TODO: remove once filtering works */}
          <VisuallyHidden>{card.name}</VisuallyHidden>
          {card.image ? (
            <Image
              alt={card.name}
              src={card.image}
              width={WIDTH}
              height={HEIGHT}
            />
          ) : (
            <Box
              borderRadius="3%"
              backgroundColor={COLOR_TO_BACKGROUND_COLOR[card.color]}
              height="100%"
              py="12px"
              px="8px"
            >
              <Text fontWeight="bold">{card.name}</Text>
              <Text>
                {card.mana_cost.replaceAll("{", "(").replaceAll("}", ")")}
              </Text>
              <Text>{card.type}</Text>
            </Box>
          )}
        </div>
        {card.back?.image && (
          <div className={styles.flipBoxBack}>
            <Image
              alt={`${card.name} Back`}
              src={card.back.image}
              width={WIDTH}
              height={HEIGHT}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicCard;
