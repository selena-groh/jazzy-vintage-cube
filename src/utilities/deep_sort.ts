import { Card } from "./magic_types";

export function alphaCompare(a: Card, b: Card): number {
  const textA = a.name.toUpperCase();
  const textB = b.name.toUpperCase();
  return textA.localeCompare(textB);
}

export function formatLabel(label: string | undefined): string {
  return label ?? "unknown";
}

function isSimpleGroup(groups: DeepSorted): groups is Card[] {
  return groups.length === 0 || !Array.isArray(groups[0]);
}

export function countGroup(group: DeepSorted): number {
  if (!isSimpleGroup(group)) {
    const counts = group.map(([, group2]) => countGroup(group2));
    return counts.reduce((a, b) => a + b, 0);
  }
  return group.length;
}

const CARD_TYPES: string[] = [
  "Prophecy",
  "Creature",
  "Planeswalker",
  "Instant",
  "Sorcery",
  "Artifact",
  "Enchantment",
  "Conspiracy",
  "Contraption",
  "Phenomenon",
  "Plane",
  "Scheme",
  "Vanguard",
  "Land",
  "Battle",
];
const GUILDS: string[] = [
  "Azorius",
  "Dimir",
  "Rakdos",
  "Gruul",
  "Selesnya",
  "Orzhov",
  "Izzet",
  "Golgari",
  "Boros",
  "Simic",
];
const SHARDS_AND_WEDGES: string[] = [
  "Bant",
  "Esper",
  "Grixis",
  "Jund",
  "Naya",
  "Mardu",
  "Temur",
  "Abzan",
  "Jeskai",
  "Sultai",
];
const FOUR_AND_FIVE_COLOR: string[] = [
  "Non-White",
  "Non-Blue",
  "Non-Black",
  "Non-Red",
  "Non-Green",
  "Five Color",
];

export const SortFunctions: Record<string, (a: Card, b: Card) => number> = {
  Alphabetical: alphaCompare,
  "Mana Value": (a, b) => a.manaValue - b.manaValue,
};

function getLabelsRaw(
  cube: Card[] | null,
  sort: string,
  showOther: boolean
): string[] {
  let ret: string[] = [];

  /* Start of sort Options */
  if (sort === "Color Category") {
    ret = [
      "White",
      "Blue",
      "Black",
      "Red",
      "Green",
      "Hybrid",
      "Multicolored",
      "Colorless",
      "Land",
    ];
  } else if (sort === "Mana Value") {
    ret = ["0", "1", "2", "3", "4", "5", "6", "7", "8+"];
  } else if (sort === "Unsorted") {
    ret = ["All"];
  } else if (sort === "Types-Multicolor") {
    ret = CARD_TYPES.filter((type) => type !== "Land")
      .concat(GUILDS)
      .concat(SHARDS_AND_WEDGES)
      .concat(FOUR_AND_FIVE_COLOR)
      .concat(["Land", "Other"]);
  } /* End of sort options */

  // whitespace around 'Other' to prevent collisions
  return showOther ? [...ret, " Other "] : ret;
}

export function cardGetLabels(
  card: Card,
  sort: string,
  showOther = false
): string[] {
  let ret: string[] = [];
  /* Start of sort options */
  if (sort === "Color Category") {
    ret = [card.color];
  } else if (sort === "Mana Value") {
    // Sort by Mana Value, but collapse all >= 8 into '8+' category.
    if (card.manaValue >= 8) {
      ret = ["8+"];
    } else {
      ret = [card.manaValue.toString()];
    }
  } else if (sort === "Types-Multicolor") {
    if (card.colorIdentity?.length <= 1) {
      ret = [card.typeCategory];
    } else {
      ret = [card.faction];
    }
  } else if (sort === "Unsorted") {
    ret = ["All"];
  }
  /* End of sort options */

  if (showOther && ret.length === 0) {
    // whitespace around 'Other' to prevent collisions
    ret = [" Other "];
  }
  return ret;
}

export function sortGroupsOrdered(
  cards: Card[],
  sort: string,
  showOther: boolean
): [string, Card[]][] {
  const labels = getLabelsRaw(cards, sort, showOther);
  const allCardLabels: [Card, string[]][] = cards.map((card) => [
    card,
    cardGetLabels(card, sort, showOther).map((label) => {
      if (labels.includes(label)) {
        return label;
      }
      return " Other ";
    }),
  ]);
  const compare = (x: string, y: string) =>
    labels.indexOf(x) - labels.indexOf(y);
  const byLabel: Record<string, Card[]> = {};
  for (const [card, cardLabels] of allCardLabels) {
    if (cardLabels && cardLabels.length > 0) {
      cardLabels.sort(compare);
      for (const label of cardLabels) {
        if (!byLabel[label]) {
          byLabel[label] = [];
        }
        byLabel[label].push(card);
      }
    }
  }
  return labels
    .filter((label) => byLabel[label])
    .map((label) => [formatLabel(label), byLabel[label]]);
}

export type DeepSorted = Card[] | [string, DeepSorted][];
export function sortDeep(
  cards: Card[],
  showOther: boolean,
  last: string,
  ...sorts: string[]
): DeepSorted {
  if (sorts.length === 0) {
    return [...cards].sort(SortFunctions[last]);
  }
  const [first, ...rest] = sorts;
  const nextSort = sortGroupsOrdered(cards, first ?? "Unsorted", showOther);
  const result: [string, DeepSorted][] = [];
  for (const [label, group] of nextSort) {
    if (rest.length > 0) {
      result.push([label, sortDeep(group, showOther, last, ...rest)]);
    } else {
      result.push([label, group.sort(SortFunctions[last])]);
    }
  }
  return result;
}
