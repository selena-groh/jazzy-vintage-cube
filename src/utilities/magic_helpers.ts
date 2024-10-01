import {
  Card,
  CardBuckets,
  Color,
  ColorOrderIndices,
  COLORS_AFFECTING_MANA_VALUE,
  isManaCost,
  MANA_AFFECTING_CARD_COLOR,
  ManaCost,
  RawCard,
} from "./magic_types";

// Note: to obtain indexNumber (e.g. 51) from a number (e.g. 51/540), you can run card.number.split("/")[0]
export function getIndexNumberFromTotalNumber(
  number: `${number}/${number}`
): number {
  return parseInt(number.split("/")[0]);
}

// Splits a string into an array of each bracket e.g. "{W}{G/P}" becomes ["{W}", "{G/P}"]
export function splitManaCostIntoArray(mana_cost: string): ManaCost[] {
  const maybeManaCosts: unknown[] = mana_cost.match(/\{[^}]+\}/g) || [];

  if (maybeManaCosts.length === 0 && mana_cost) {
    throw new Error("Invalid Mana Cost");
  }

  const manaCosts: ManaCost[] = maybeManaCosts.map((maybeManaCost) => {
    if (isManaCost(maybeManaCost)) {
      return maybeManaCost as ManaCost;
    }
    throw new Error("Invalid Mana Cost");
  });

  return manaCosts;
}

export function getManaValueFromCost(mana_cost: string): number {
  const manaCostArray = splitManaCostIntoArray(mana_cost);

  const manaValue = manaCostArray.reduce((acc, currentValueInBrackets) => {
    const currentValue = currentValueInBrackets
      .replace("{", "")
      .replace("}", "");
    const numbersInCurrentValue = currentValue.replace(/[^0-9]/g, "");

    if (numbersInCurrentValue) {
      // If current value contains a number, use that number
      return acc + Number(numbersInCurrentValue);
    } else if (COLORS_AFFECTING_MANA_VALUE.test(currentValue)) {
      // If current value contains a character that affects mana value (e.g. W, U, B, R, G, P, C), add 1
      return acc + 1;
    } else {
      // Add 0 if it doesn't contain a number or a character that affects mana value (for example, if the pip is just X, the value is 0)
      return acc;
    }
  }, 0);

  return manaValue;
}

export function bucketCardsByColor(cards: Card[]): CardBuckets {
  return {
    [Color.White]: cards.filter((card) => card.color === Color.White),
    [Color.Blue]: cards.filter((card) => card.color === Color.Blue),
    [Color.Black]: cards.filter((card) => card.color === Color.Black),
    [Color.Red]: cards.filter((card) => card.color === Color.Red),
    [Color.Green]: cards.filter((card) => card.color === Color.Green),
    [Color.Multicolored]: cards.filter(
      (card) => card.color === Color.Multicolored
    ),
    [Color.Colorless]: cards.filter((card) => card.color === Color.Colorless),
    [Color.Land]: cards.filter((card) => card.color === Color.Land),
  };
}

// General Algorithm to color cards
//
// 1. if card.type contains "Land" -> Land
// 2. if card.cost contains more than 1 WUBRG OR card.type is Prophecy -> Multicolored
// 3. if card.cost contains W -> White
// 4. if card.cost contains U -> Blue
// 5. if card.cost contains B -> Black
// 6. if card.cost contains R -> Red
// 7. if card.cost contains G -> Green
// 8. else -> Colorless

// --- OR ---
// 8. if card.type contains "Artifact" -> Artifact
// 9. else -> Colorless

export function getColorFromManaCost(mana_cost: string): Color {
  // Strip out all characters besides WUBRG
  const coloredManaChars = mana_cost
    .split("")
    .filter((char) => MANA_AFFECTING_CARD_COLOR.includes(char));

  // Deduplicate so that WW becomes W
  var deduplicatedColoredManaChars = new Set(coloredManaChars);

  // If there's more than one color in the deduplicated set, the card is Multicolored
  if (deduplicatedColoredManaChars.size > 1) {
    return Color.Multicolored;
  }

  // Else, there's only one color (or zero) so we return the appropriate color
  const setIter = deduplicatedColoredManaChars.keys();
  switch (setIter.next().value) {
    case "W":
      return Color.White;
    case "U":
      return Color.Blue;
    case "B":
      return Color.Black;
    case "R":
      return Color.Red;
    case "G":
      return Color.Green;
    default:
      return Color.Colorless;
  }
}

export function getColorFromCard(rawCard: RawCard): Color {
  if (rawCard.type.includes("Land")) {
    return Color.Land;
  }
  if (rawCard.type.includes("Prophecy")) {
    return Color.Multicolored;
  }
  return getColorFromManaCost(rawCard.mana_cost);
}

// Type category is one of: creature, instant, sorcery, enchantment, artifact, planeswalker, land, prophecy, battle
// tiebreakers: land > planeswalker > creature > artifact > enchantment > instant > sorcery > prophecy > battle
export function getTypeCategory(rawType: string): string {
  const type = rawType.toLowerCase();
  if (type.includes("land")) {
    return "Land";
  } else if (type.includes("planeswalker")) {
    return "Planeswalker";
  } else if (type.includes("creature")) {
    return "Creature";
  } else if (type.includes("artifact")) {
    return "Artifact";
  } else if (type.includes("enchantment")) {
    return "Enchantment";
  } else if (type.includes("instant")) {
    return "Instant";
  } else if (type.includes("sorcery")) {
    return "Sorcery";
  } else if (type.includes("prophecy")) {
    return "Prophecy";
  } else if (type.includes("battle")) {
    return "Battle";
  }
  throw new Error("Could not calculate type category");
}

export function processCard(rawCard: RawCard): Card {
  return {
    ...rawCard,
    color: getColorFromCard(rawCard),
    manaValue: getManaValueFromCost(rawCard.mana_cost),
  };
}

// TODO add more sorting methods
// default table sort in order:
// - sort by color (in color order, see cube cobra)
// for WUBRG + colorless:
// - sort by type (creature, then every other type in alphabetical order)
// - sort by mana value (integer) -> if #, that number, if X/Y/etc.., 0, else 1 (line separating mana value)
// - sort by name
// for multicolor:
// - maybe sort by prophecy first (on top)
// - sort by confusing names (color identity) -> prophecies will be their own category
// - sort by mana value
// - sort by name
// for lands:
// - alphabetically

// default gallery sort
// - sort by color (in color order, see cube cobra)
// - alphabetically

export function sortCards(a: Card, b: Card): number {
  const aColorIndex = ColorOrderIndices[a.color];
  const bColorIndex = ColorOrderIndices[b.color];

  if (aColorIndex < bColorIndex) {
    return -1;
  }
  if (aColorIndex > bColorIndex) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function gallerySort(a: Card, b: Card): number {
  const aColorIndex = ColorOrderIndices[a.color];
  const bColorIndex = ColorOrderIndices[b.color];

  if (aColorIndex < bColorIndex) {
    return -1;
  }
  if (aColorIndex > bColorIndex) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
