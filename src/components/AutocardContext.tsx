// Adapted from https://github.com/dekkerglen/CubeCobra/blob/master/src/components/AutocardListGroup.tsx

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Card } from "@/utilities/magic_types";
import { Box } from "@chakra-ui/react";
import styles from "./Autocard.module.css";

interface CardDivProps {
  hidden: boolean;
  front: string | null;
  back: string | null;
}

type Position = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

const CardDiv: React.FC<CardDivProps> = ({ hidden, front, back }) => {
  const [position, setPosition] = useState<Position>({
    left: "0px",
    right: "0px",
  });
  const autocardPopup = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.onmousemove = (e) => {
      if (!autocardPopup.current) {
        return;
      }
      const leftPixelSpace = e.clientX;
      const rightPixelSpace = window.innerWidth - leftPixelSpace;
      const topPixelSpace = e.clientY;
      const bottomPixelSpace = window.innerHeight - topPixelSpace;

      const xOffset = e.clientX + window.pageXOffset;
      const yOffset = e.clientY + window.pageYOffset;

      const newPosition: Position = {};

      if (rightPixelSpace > leftPixelSpace) {
        // display on right
        newPosition.left = `${Math.max(window.pageXOffset, 5 + xOffset)}px`;
        // newPosition.right = null;
      } else {
        // display on left
        newPosition.right = `${Math.max(window.innerWidth + 5 - xOffset, 0)}px`;
        // newPosition.left = null;
      }
      if (autocardPopup.current!.offsetHeight > window.innerHeight) {
        newPosition.top = `${window.pageYOffset}px`;
        // newPosition.bottom = null;
      } else if (bottomPixelSpace > topPixelSpace) {
        // display on bottom
        newPosition.top = `${5 + yOffset}px`;
        // newPosition.bottom = null;
      } else {
        // display on top
        newPosition.bottom = `${window.innerHeight + 5 - yOffset}px`;
        // newPosition.top = null;
      }
      setPosition(newPosition);
    };
  }, []);

  return (
    <Box
      id={styles.autocardPopup}
      style={{
        display: hidden ? "none" : "block",
        zIndex: 500,
        width: back ? "30rem" : "15rem",
        ...position,
      }}
      ref={autocardPopup}
    >
      <Box backgroundColor="#efefef" backgroundClip="content-box">
        <Box display="flex" flexWrap="wrap">
          {front && (
            <Box position="relative" borderRadius="4.72% / 3.37%">
              <img
                id="autocardImageFront"
                src={front}
                alt={front}
                key={front}
              />
            </Box>
          )}
          {back && (
            <Box position="relative" borderRadius="4.72% / 3.37%">
              <img id="autocardImageBack" src={back} alt={back} key={back} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export interface AutocardContextValue {
  showCard: (card: Card) => void;
  hideCard: () => void;
}

const AutocardContext = React.createContext<AutocardContextValue>({
  showCard: () => {},
  hideCard: () => {},
});

export const AutocardContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [hidden, setHidden] = useState(true);
  const [front, setFront] = useState<string | null>(null);
  const [back, setBack] = useState<string | null>(null);

  const showCard = useCallback((card: Card) => {
    setHidden(false);
    setFront(card.image ?? null);
    setBack(card.back?.image ?? null);
  }, []);

  const hideCard = useCallback(() => {
    setHidden(true);
    setFront(null);
    setBack(null);
  }, []);

  const value: AutocardContextValue = {
    showCard,
    hideCard,
  };

  return (
    <AutocardContext.Provider value={value}>
      {children}
      <CardDiv hidden={hidden} front={front} back={back} />
    </AutocardContext.Provider>
  );
};

export default AutocardContext;
