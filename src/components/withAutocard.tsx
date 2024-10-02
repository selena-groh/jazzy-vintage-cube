// Adapted from https://github.com/dekkerglen/CubeCobra/blob/main/src/components/WithAutocard.tsx

import { Card } from "@/utilities/magic_types";
import React, { ElementType, forwardRef, ReactNode, useContext } from "react";
import AutocardContext from "./AutocardContext";

export interface WithAutocardProps {
  card?: Card;
  children?: ReactNode;
}

const withAutocard = <T extends ElementType>(Tag: T) => {
  const Result = forwardRef<T, WithAutocardProps & React.ComponentProps<T>>(
    ({ card, ...props }, ref) => {
      const { showCard, hideCard } = useContext(AutocardContext);

      return (
        <Tag
          ref={ref}
          onMouseEnter={() => showCard(card)}
          onMouseLeave={() => hideCard()}
          {...(props as any)}
        />
      );
    }
  );
  Result.displayName = `withAutocard(${
    typeof Tag === "function" ? Tag.displayName : Tag.toString()
  })`;
  return Result;
};

export default withAutocard;
