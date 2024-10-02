import { Card } from "./magic_types";

export function arrayIsSubset<T>(
  needles: T[],
  haystack: T[],
  comparison?: (a: T, b: T) => boolean
): boolean {
  if (comparison) {
    return needles.every((elem) =>
      haystack.some((elem2) => comparison(elem, elem2))
    );
  }
  return needles.every((x) => haystack.includes(x));
}

export function fromEntries<T>(entries: [string, T][]): { [key: string]: T } {
  const obj: { [key: string]: T } = {};
  for (const [k, v] of entries) {
    obj[k] = v;
  }
  return obj;
}

export function alphaCompare(
  a: Card,
  b: Card
): number {
  const textA = a.name.toUpperCase();
  const textB = b.name.toUpperCase();
  return textA.localeCompare(textB);
}

const COLOR_MAP: Record<string, string> = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
};

const GUILD_MAP: Record<string, string> = {
  WU: "Azorius",
  UB: "Dimir",
  BR: "Rakdos",
  RG: "Gruul",
  WG: "Selesnya",
  WB: "Orzhov",
  UR: "Izzet",
  BG: "Golgari",
  WR: "Boros",
  UG: "Simic",
};

const SHARD_AND_WEDGE_MAP: Record<string, string> = {
  WUG: "Bant",
  WUB: "Esper",
  UBR: "Grixis",
  BRG: "Jund",
  WRG: "Naya",
  WBG: "Abzan",
  WUR: "Jeskai",
  UBG: "Sultai",
  WBR: "Mardu",
  URG: "Temur",
};

const FOUR_COLOR_MAP: Record<string, string> = {
  UBRG: "Non-White",
  WBRG: "Non-Blue",
  WURG: "Non-Black",
  WUBG: "Non-Red",
  WUBR: "Non-Green",
};

const CARD_TYPES: string[] = [
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

const SINGLE_COLOR: string[] = ["White", "Blue", "Black", "Red", "Green"];
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

function removeAdjacentDuplicates<T>(arr: T[]): T[] {
  return arr.filter((x, i) => i === 0 || x !== arr[i - 1]);
}

function defaultSort(x: string, y: string): number {
  if (!/^\d+$/.test(x) || !/^\d+$/.test(y)) {
    return x < y ? -1 : 1;
  }
  return parseInt(x, 10) < parseInt(y, 10) ? -1 : 1;
}

export function getColorIdentity(colors: string[]): string {
  if (colors.length === 0) {
    return "Colorless";
  } else if (colors.length === 1) {
    if (Object.keys(COLOR_MAP).includes(colors[0])) {
      return COLOR_MAP[colors[0]];
    }
    if (colors[0] === "C") {
      return "Colorless";
    }
    return "None";
  } else {
    return "Multicolored";
  }
}

export function getColorCombination(colors: string[]): string {
  if (colors.length < 2) {
    return getColorIdentity(colors);
  }
  const ordered = [..."WUBRG"].filter((c) => colors.includes(c)).join("");
  if (colors.length === 2) {
    return GUILD_MAP[ordered];
  }
  if (colors.length === 3) {
    return SHARD_AND_WEDGE_MAP[ordered];
  }
  if (colors.length === 4) {
    return FOUR_COLOR_MAP[ordered];
  }
  return "Five Color";
}

export function GetColorCategory(type: string, colors: string[]): string {
  if (type.toLowerCase().includes("land")) {
    return "Lands";
  }
  return getColorIdentity(colors);
}

export const SORTS: string[] = [
  "Mana Value",
];

export const ORDERED_SORTS: string[] = [
  "Alphabetical",
  "Mana Value",
];

export const SortFunctions: Record<string, (a: Card, b: Card) => number> = {
  Alphabetical: alphaCompare,
  "Mana Value": (a, b) => a.manaValue - b.manaValue,
};

const allDevotions = (cube: Card[], color: string): string[] => {
  const counts = new Set<number>();
  for (const card of cube) {
    counts.add(cardDevotion(card, color));
  }
  return [...counts].sort((a, b) => a - b).map((n) => n.toFixed(0));
};

function getLabelsRaw(cube: Card[] | null, sort: string, showOther: boolean): string[] {
  let ret: string[] = [];

  /* Start of sort Options */
  if (sort === 'Color Category') {
    ret = ['White', 'Blue', 'Black', 'Red', 'Green', 'Hybrid', 'Multicolored', 'Colorless', 'Lands'];
  } else if (sort === 'Color Category Full') {
    ret = SINGLE_COLOR.concat(['Colorless'])
      .concat(GUILDS)
      .concat(SHARDS_AND_WEDGES)
      .concat(FOUR_AND_FIVE_COLOR)
      .concat(['Lands']);
  } else if (sort === 'Color Identity') {
    ret = ['White', 'Blue', 'Black', 'Red', 'Green', 'Multicolored', 'Colorless'];
  } else if (sort === 'Color Identity Full') {
    ret = SINGLE_COLOR.concat(['Colorless']).concat(GUILDS).concat(SHARDS_AND_WEDGES).concat(FOUR_AND_FIVE_COLOR);
  } else if (sort === 'Color Combination Includes' || sort === 'Includes Color Combination') {
    ret = ['Colorless'].concat(SINGLE_COLOR).concat(GUILDS).concat(SHARDS_AND_WEDGES).concat(FOUR_AND_FIVE_COLOR);
  } else if (sort === 'Mana Value' || sort === 'CMC') {
    ret = ['0', '1', '2', '3', '4', '5', '6', '7', '8+'];
  } else if (sort === 'Mana Value 2') {
    ret = ['0-1', '2', '3', '4', '5', '6', '7+'];
  } else if (sort === 'Mana Value Full') {
    // All unique CMCs of cards in the cube, rounded to a half-integer
    ret =
      cube
        ?.map((card) => Math.round(cardCmc(card) * 2) / 2)
        ?.filter((n, i, arr) => arr.indexOf(n) === i)
        ?.sort((a, b) => a - b)
        ?.map((n) => n.toString()) ?? [];
  } else if (sort === 'Color') {
    ret = ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless'];
  } else if (sort === 'Type') {
    ret = CARD_TYPES.concat(['Other']);
  } else if (sort === 'Supertype') {
    ret = ['Snow', 'Legendary', 'Tribal', 'Basic', 'Elite', 'Host', 'Ongoing', 'World'];
  } else if (sort === 'Tags') {
    const tags: string[] = [];
    for (const card of cube || []) {
      for (const tag of card.tags || []) {
        if (tag.length > 0 && !tags.includes(tag)) {
          tags.push(tag);
        }
      }
    }
    ret = tags.sort();
  } else if (sort === 'Date Added') {
    const dates = (cube ?? []).map((card) => cardAddedTime(card) ?? new Date(0));
    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
    const days = sortedDates.map((date) => date.toLocaleDateString('en-US'));
    ret = removeAdjacentDuplicates(days);
  } else if (sort === 'Status') {
    ret = ['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'];
  } else if (sort === 'Finish') {
    ret = ['Non-foil', 'Foil', 'Etched'];
  } else if (sort === 'Guilds') {
    ret = GUILDS;
  } else if (sort === 'Shards / Wedges') {
    ret = SHARDS_AND_WEDGES;
  } else if (sort === 'Color Count') {
    ret = ['0', '1', '2', '3', '4', '5'];
  } else if (sort === 'Set') {
    const sets: string[] = [];
    for (const card of cube || []) {
      const set = cardSet(card).toUpperCase();
      if (!sets.includes(set)) {
        sets.push(set);
      }
    }
    ret = sets.sort();
  } else if (sort === 'Artist') {
    const artists: string[] = [];
    for (const card of cube || []) {
      if (!artists.includes(cardArtist(card))) {
        artists.push(cardArtist(card));
      }
    }
    ret = artists.sort();
  } else if (sort === 'Rarity') {
    ret = ['Common', 'Uncommon', 'Rare', 'Mythic', 'Special'];
  } else if (sort === 'Unsorted') {
    ret = ['All'];
  } else if (sort === 'Popularity') {
    ret = ['0–1%', '1–2%', '3–5%', '5–8%', '8–12%', '12–20%', '20–30%', '30–50%', '50–100%'];
  } else if (sort === 'Subtype') {
    const types = new Set<string>();
    for (const card of cube || []) {
      const split = (card.type_line || '').split(/[-–—]/);
      if (split.length > 1) {
        const subtypes = split[1].trim().split(' ');
        const nonemptySubtypes = subtypes.filter((x) => x.trim());
        for (const subtype of nonemptySubtypes) {
          types.add(subtype.trim());
        }
      }
    }
    ret = [...types];
  } else if (sort === 'Types-Multicolor') {
    ret = CARD_TYPES.filter((type) => type !== 'Land')
      .concat(GUILDS)
      .concat(SHARDS_AND_WEDGES)
      .concat(FOUR_AND_FIVE_COLOR)
      .concat(['Land', 'Other']);
  } else if (sort === 'Legality') {
    ret = ['Standard', 'Modern', 'Legacy', 'Vintage', 'Pioneer', 'Brawl', 'Historic', 'Pauper', 'Penny', 'Commander'];
  } else if (sort === 'Power') {
    const items: string[] = [];
    for (const card of cube || []) {
      if (card.details?.power) {
        if (!items.includes(card.details.power)) {
          items.push(card.details.power);
        }
      }
    }
    ret = items.sort(defaultSort);
  } else if (sort === 'Toughness') {
    const items: string[] = [];
    for (const card of cube || []) {
      if (card.details?.toughness) {
        if (!items.includes(card.details.toughness)) {
          items.push(card.details.toughness);
        }
      }
    }
    ret = items.sort(defaultSort);
  } else if (sort === 'Loyalty') {
    const items: string[] = [];
    for (const card of cube || []) {
      if (card.details?.loyalty) {
        if (!items.includes(card.details.loyalty)) {
          items.push(card.details.loyalty);
        }
      }
    }
    ret = items.sort(defaultSort);
  } else if (sort === 'Manacost Type') {
    ret = ['Gold', 'Hybrid', 'Phyrexian'];
  } else if (sort === 'Creature/Non-Creature') {
    ret = ['Creature', 'Non-Creature'];
  } else if (['Price', 'Price USD', 'Price Foil', 'Price USD Foil'].includes(sort)) {
    const labels: string[] = [];
    for (let i = 0; i <= priceBuckets.length; i++) {
      labels.push(priceBucketLabel(i, '$'));
    }
    labels.push('No Price Available');
    ret = labels;
  } else if (sort === 'Price EUR') {
    const labels: string[] = [];
    for (let i = 0; i <= priceBuckets.length; i++) {
      labels.push(priceBucketLabel(i, '€'));
    }
    labels.push('No Price Available');
    ret = labels;
  } else if (sort === 'MTGO TIX') {
    const labels: string[] = [];
    for (let i = 0; i <= priceBuckets.length; i++) {
      labels.push(priceBucketLabel(i, ''));
    }
    labels.push('No Price Available');
    ret = labels;
  } else if (sort === 'Devotion to White') {
    ret = allDevotions(cube || [], 'W');
  } else if (sort === 'Devotion to Blue') {
    ret = allDevotions(cube || [], 'U');
  } else if (sort === 'Devotion to Black') {
    ret = allDevotions(cube || [], 'B');
  } else if (sort === 'Devotion to Red') {
    ret = allDevotions(cube || [], 'R');
  } else if (sort === 'Devotion to Green') {
    ret = allDevotions(cube || [], 'G');
  } else if (sort === 'Elo') {
    let elos: number[] = [];
    for (const card of cube || []) {
      const elo = cardElo(card);
      if (!elos.includes(elo)) {
        elos.push(elo);
      }
    }
    elos = elos.sort((x, y) => (x < y ? -1 : 1));
    const buckets = elos.map(getEloBucket);
    const res: string[] = [];
    for (const bucket of buckets) {
      if (!res.includes(bucket)) {
        res.push(bucket);
      }
    }
    ret = res;
  }

export function cardGetLabels(
  card: Card,
  sort: string,
  showOther = false
): string[] {
  let ret: string[] = [];
  /* Start of sort options */
  if (sort === "Color Category") {
    ret = [
      card.colorCategory ??
        GetColorCategory(cardType(card), cardColorIdentity(card)),
    ];
  } else if (sort === "Color Category Full") {
    const colorCategory =
      card.colorCategory ??
      GetColorCategory(cardType(card), cardColorIdentity(card));
    if (colorCategory === "Multicolored") {
      ret = [getColorCombination(cardColorIdentity(card))];
    } else {
      ret = [colorCategory];
    }
  } else if (sort === "Color Identity") {
    ret = [getColorIdentity(cardColorIdentity(card))];
  } else if (sort === "Color Identity Full") {
    ret = [getColorCombination(cardColorIdentity(card))];
  } else if (sort === "Color Combination Includes") {
    ret = COLOR_COMBINATIONS.filter((comb) =>
      arrayIsSubset(cardColorIdentity(card), comb)
    ).map(getColorCombination);
  } else if (sort === "Includes Color Combination") {
    ret = COLOR_COMBINATIONS.filter((comb) =>
      arrayIsSubset(comb, cardColorIdentity(card))
    ).map(getColorCombination);
  } else if (sort === "Color") {
    const colors = cardColors(card);
    if (colors.length === 0) {
      ret = ["Colorless"];
    } else {
      ret = colors.map((c: string) => COLOR_MAP[c]).filter((c) => c);
    }
  } else if (sort === "4+ Color") {
    if (cardColorIdentity(card).length === 5) {
      ret = ["Five Color"];
    } else if (cardColorIdentity(card).length === 4) {
      ret = [..."WUBRG"]
        .filter((c) => !cardColorIdentity(card).includes(c))
        .map((c) => `Non-${COLOR_MAP[c]}`);
    }
  } else if (sort === "Mana Value" || sort === "CMC") {
    // Sort by CMC, but collapse all >= 8 into '8+' category.
    const cmc = Math.round(cardCmc(card));
    if (cmc >= 8) {
      ret = ["8+"];
    } else {
      ret = [cmc.toString()];
    }
  } else if (sort === "Mana Value 2") {
    const cmc = Math.round(cardCmc(card));
    if (cmc >= 7) {
      ret = ["7+"];
    } else if (cmc <= 1) {
      ret = ["0-1"];
    } else {
      ret = [cmc.toString()];
    }
  } else if (sort === "Mana Value Full") {
    // Round to half-integer.
    ret = [(Math.round(cardCmc(card) * 2) / 2).toString()];
  } else if (sort === "Supertype" || sort === "Type") {
    const split = cardType(card).split(/[-–—]/);
    let types: string[];
    if (split.length > 1) {
      types = split[0]
        .trim()
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x);
    } else {
      types = cardType(card)
        .trim()
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x);
    }
    if (types.includes("Contraption")) {
      ret = ["Contraption"];
    } else if (types.includes("Plane")) {
      ret = ["Plane"];
    } else {
      const labels = getLabelsRaw(null, sort, showOther);
      ret = types.filter((t) => labels.includes(t));
    }
  } else if (sort === "Tags") {
    ret = card.tags || [];
  } else if (sort === "Status") {
    ret = [cardStatus(card)];
  } else if (sort === "Finish") {
    ret = [cardFinish(card)];
  } else if (sort === "Date Added") {
    ret = [(cardAddedTime(card) ?? new Date(0)).toLocaleDateString("en-US")];
  } else if (sort === "Guilds") {
    if (cardColorIdentity(card).length === 2) {
      const ordered = [..."WUBRG"]
        .filter((c) => cardColorIdentity(card).includes(c))
        .join("");
      ret = [GUILD_MAP[ordered]];
    }
  } else if (sort === "Shards / Wedges") {
    if (cardColorIdentity(card).length === 3) {
      const ordered = [..."WUBRG"]
        .filter((c) => cardColorIdentity(card).includes(c))
        .join("");
      ret = [SHARD_AND_WEDGE_MAP[ordered]];
    }
  } else if (sort === "Color Count") {
    ret = [cardColorIdentity(card).length.toFixed(0)];
  } else if (sort === "Set") {
    ret = [cardSet(card).toUpperCase()];
  } else if (sort === "Rarity") {
    const rarity = cardRarity(card);
    ret = [rarity[0].toUpperCase() + rarity.slice(1)];
  } else if (sort === "Subtype") {
    const split = cardType(card).split(/[-–—]/);
    if (split.length > 1) {
      const subtypes = split[1].trim().split(" ");
      ret = subtypes.map((subtype) => subtype.trim()).filter((x) => x);
    }
  } else if (sort === "Types-Multicolor") {
    if (cardColorIdentity(card).length <= 1) {
      const split = cardType(card).split("—");
      const types = split[0].trim().split(" ");
      const type = types[types.length - 1];
      // check last type
      if (
        ![
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
        ].includes(type)
      ) {
        ret = ["Other"];
      } else {
        ret = [type];
      }
    } else if (cardColorIdentity(card).length === 5) {
      ret = ["Five Color"];
    } else {
      ret = [
        ...cardGetLabels(card, "Guilds", showOther),
        ...cardGetLabels(card, "Shards / Wedges", showOther),
        ...cardGetLabels(card, "4+ Color", showOther),
      ];
    }
  } else if (sort === "Artist") {
    ret = [cardArtist(card)];
  } else if (sort === "Legality") {
    ret = Object.entries(card.details?.legalities ?? {})
      .filter(([, v]) => ["legal", "banned"].includes(v))
      .map(([k]) => k);
  } else if (sort === "Power") {
    if (card.details?.power) {
      ret = [card.details?.power];
    }
  } else if (sort === "Toughness") {
    if (card.details?.toughness) {
      ret = [card.details?.toughness];
    }
  } else if (sort === "Loyalty") {
    if (card.details?.loyalty) {
      ret = [card.details?.loyalty ?? "0"];
    }
  } else if (sort === "Manacost Type") {
    const colors = cardColors(card);
    const parsedCost = card.details?.parsed_cost ?? [];
    if (
      colors.length > 1 &&
      parsedCost.every((symbol: string) => !symbol.includes("-"))
    ) {
      ret = ["Gold"];
    } else if (
      colors.length > 1 &&
      parsedCost.some(
        (symbol: string) => symbol.includes("-") && !symbol.includes("-p")
      )
    ) {
      ret = ["Hybrid"];
    } else if (parsedCost.some((symbol: string) => symbol.includes("-p"))) {
      ret = ["Phyrexian"];
    }
  } else if (sort === "Creature/Non-Creature") {
    ret = cardType(card).toLowerCase().includes("creature")
      ? ["Creature"]
      : ["Non-Creature"];
  } else if (sort === "Price USD" || sort === "Price") {
    const price = card.details?.prices.usd ?? card.details?.prices.usd_foil;
    if (price) {
      ret = [getPriceBucket(price, "$")];
    } else {
      ret = ["No Price Available"];
    }
  } else if (sort === "Price USD Foil") {
    const price = card.details?.prices.usd_foil;
    if (price) {
      ret = [getPriceBucket(price, "$")];
    } else {
      ret = ["No Price Available"];
    }
  } else if (sort === "Price EUR") {
    const price = cardPriceEur(card);
    if (price) {
      ret = [getPriceBucket(price, "€")];
    } else {
      ret = ["No Price Available"];
    }
  } else if (sort === "MTGO TIX") {
    const price = cardTix(card);
    if (price) {
      ret = [getPriceBucket(price, "")];
    } else {
      ret = ["No Price Available"];
    }
  } else if (sort === "Devotion to White") {
    ret = [cardDevotion(card, "w").toString()];
  } else if (sort === "Devotion to Blue") {
    ret = [cardDevotion(card, "u").toString()];
  } else if (sort === "Devotion to Black") {
    ret = [cardDevotion(card, "b").toString()];
  } else if (sort === "Devotion to Red") {
    ret = [cardDevotion(card, "r").toString()];
  } else if (sort === "Devotion to Green") {
    ret = [cardDevotion(card, "g").toString()];
  } else if (sort === "Unsorted") {
    ret = ["All"];
  } else if (sort === "Popularity") {
    const popularity = cardPopularity(card);
    if (popularity < 1) ret = ["0–1%"];
    else if (popularity < 2) ret = ["1–2%"];
    else if (popularity < 5) ret = ["3–5%"];
    else if (popularity < 8) ret = ["5–8%"];
    else if (popularity < 12) ret = ["8–12%"];
    else if (popularity < 20) ret = ["12–20%"];
    else if (popularity < 30) ret = ["20–30%"];
    else if (popularity < 50) ret = ["30–50%"];
    else if (popularity <= 100) ret = ["50–100%"];
  } else if (sort === "Elo") {
    ret = [getEloBucket(cardElo(card))];
  }
  /* End of sort options */

  if (showOther && ret.length === 0) {
    // whitespace around 'Other' to prevent collisions
    ret = [" Other "];
  }
  return ret;
}

export function cardCanBeSorted(card: any, sort: string): boolean {
  return cardGetLabels(card, sort, false).length !== 0;
}

export function cardIsLabel(card: any, label: string, sort: string): boolean {
  return cardGetLabels(card, sort, false).includes(label);
}

export function formatLabel(label: string | undefined): string {
  return label ?? "unknown";
}

// Get labels in string form.
export function getLabels(
  cube: Card[] | null,
  sort: string,
  showOther = false
): string[] {
  return getLabelsRaw(cube, sort, showOther).map(formatLabel);
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

export function sortIntoGroups(
  cards: Card[],
  sort: string,
  showOther = false
): Record<string, Card[]> {
  return fromEntries(sortGroupsOrdered(cards, sort, showOther));
}

type DeepSorted = Card[] | [string, DeepSorted][];

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

function accumulateCards(groups: DeepSorted, accumulator: Card[]) {
  if (groups.length === 0) return [];
  if (isSimpleGroup(groups)) {
    accumulator.push(...groups);
  } else {
    for (const [, group] of groups) {
      accumulateCards(group, accumulator);
    }
  }
}

function sortedCards(groups: DeepSorted) {
  const accumulator: Card[] = [];
  accumulateCards(groups, accumulator);
  return accumulator;
}

export function sortForDownload(
  cards: Card[],
  primary: string = "Color Category",
  secondary: string = "Types-Multicolor",
  tertiary: string = "Mana Value",
  quaternary: string = "Alphabetical",
  showOther: boolean = false
): Card[] {
  const groups = sortDeep(
    cards,
    showOther,
    quaternary,
    primary,
    secondary,
    tertiary
  );
  return sortedCards(groups);
}
