import {
  Card,
  Color,
  ColorIdentitySymbol,
  FOUR_COLOR_MAP,
  GUILD_MAP,
  isManaCost,
  MANA_AFFECTING_CARD_COLOR,
  MANA_AFFECTING_MANA_VALUE,
  ManaCost,
  RawCard,
  SHARD_AND_WEDGE_MAP,
  TypeCategory,
} from "./magic_types";

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

function getColorFromManaCost(mana_cost: string): Color {
  // Strip out all characters besides WUBRG
  const coloredManaChars = mana_cost
    .split("")
    .filter((char) => MANA_AFFECTING_CARD_COLOR.includes(char));

  // Deduplicate so that WW becomes W
  const deduplicatedColoredManaChars = new Set(coloredManaChars);

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

export function getColorFromRawCard(rawCard: RawCard): Color {
  if (rawCard.type.includes("Land")) {
    return Color.Land;
  }
  if (rawCard.type.includes("Prophecy")) {
    return Color.Multicolored;
  }
  return getColorFromManaCost(rawCard.mana_cost);
}

export function getColorIdentityFromManaCost(
  mana_cost: string
): ColorIdentitySymbol[] {
  // Strip out all characters besides WUBRG
  const coloredManaChars = mana_cost
    .split("")
    .filter((char) => MANA_AFFECTING_CARD_COLOR.includes(char));

  // Deduplicate so that WW becomes W
  const deduplicatedColoredManaChars = Array.from(new Set(coloredManaChars));
  // Order the characters in WUBRG order
  const ordered = MANA_AFFECTING_CARD_COLOR.filter((c) =>
    deduplicatedColoredManaChars.includes(c)
  ) as ColorIdentitySymbol[];
  return ordered ?? [];
}

export function getFactionFromColorIdentity(
  colorIdentity: ColorIdentitySymbol[]
): string {
  const colorIdentityString = colorIdentity.join("");
  if (colorIdentity.length < 2) {
    return getColorFromManaCost(colorIdentityString);
  }
  if (colorIdentity.length === 2) {
    return GUILD_MAP[colorIdentityString];
  }
  if (colorIdentity.length === 3) {
    return SHARD_AND_WEDGE_MAP[colorIdentityString];
  }
  if (colorIdentity.length === 4) {
    return FOUR_COLOR_MAP[colorIdentityString];
  }
  return "Five Color";
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
    } else if (MANA_AFFECTING_MANA_VALUE.test(currentValue)) {
      // If current value contains a character that affects mana value (e.g. W, U, B, R, G, P, C), add 1
      return acc + 1;
    } else {
      // Add 0 if it doesn't contain a number or a character that affects mana value (for example, if the pip is just X, the value is 0)
      return acc;
    }
  }, 0);

  return manaValue;
}

// Type category is one of: creature, instant, sorcery, enchantment, artifact, planeswalker, land, prophecy, battle
// tiebreakers: land > planeswalker > creature > artifact > enchantment > instant > sorcery > prophecy > battle
export function getTypeCategory(rawType: string): string {
  const type = rawType.toLowerCase();
  if (type.includes("land")) {
    return TypeCategory.Land;
  } else if (type.includes("planeswalker")) {
    return TypeCategory.Planeswalker;
  } else if (type.includes("creature") || type.includes("summon")) {
    return TypeCategory.Creature;
  } else if (type.includes("artifact")) {
    return TypeCategory.Artifact;
  } else if (type.includes("enchantment")) {
    return TypeCategory.Enchantment;
  } else if (type.includes("instant") || type.includes("interrupt")) {
    return TypeCategory.Instant;
  } else if (type.includes("sorcery")) {
    return TypeCategory.Sorcery;
  } else if (type.includes("prophecy")) {
    return TypeCategory.Prophecy;
  } else if (type.includes("battle")) {
    return TypeCategory.Battle;
  }
  throw new Error("Could not calculate type category");
}

export function processCard(rawCard: RawCard): Card {
  const colorIdentity = getColorIdentityFromManaCost(rawCard.mana_cost);
  return {
    ...rawCard,
    color: getColorFromRawCard(rawCard),
    colorIdentity,
    faction: getFactionFromColorIdentity(colorIdentity),
    manaValue: getManaValueFromCost(rawCard.mana_cost),
    typeCategory: getTypeCategory(rawCard.type),
  };
}
