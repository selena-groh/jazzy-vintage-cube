type ColorSymbol = "W" | "U" | "B" | "R" | "G" | "P" | "C";
type HybridColorSymbol = `${ColorSymbol | number}/${ColorSymbol}`;
type ManaSymbol = ColorSymbol | HybridColorSymbol | number | "X" | "Y";
export type ManaCost = `{${ManaSymbol}}`;

export const ManaCostRegex = /\{[WUBRGPCXY0-9](?:\/[WUBRGPCXY])*\}/;

/**
 * Define a custom type guard to assert whether an unknown value is a ManaCost.
 */
export function isManaCost(maybeManaCost: unknown): maybeManaCost is ManaCost {
  return typeof maybeManaCost === "string" && ManaCostRegex.test(maybeManaCost);
}

export enum Color {
  White = "White",
  Blue = "Blue",
  Black = "Black",
  Red = "Red",
  Green = "Green",
  Multicolored = "Multicolored",
  Colorless = "Colorless",
  Land = "Land",
}

export const COLOR_ORDER = [
  Color.White,
  Color.Blue,
  Color.Black,
  Color.Red,
  Color.Green,
  Color.Multicolored,
  Color.Colorless,
  Color.Land,
];

// Converts [Color.White, Color.Blue, etc...] into an object like {[Color.White]: 0, [Color.Blue]: 1, etc...}
export const ColorOrderIndices = COLOR_ORDER.reduce((acc, value, index) => {
  acc[value] = index;
  return acc;
}, {});

export const MANA_AFFECTING_CARD_COLOR = ["W", "U", "B", "R", "G"];

export const COLORS_AFFECTING_MANA_VALUE = new RegExp("[WUBRGPC]", "i");

export type RawCard = {
  name: string;
  mana_cost: string;
  type: string;
  image: string;
  back?: {
    name: string;
    type: string;
    image: string;
  };
};

export type Card = {
  name: string;
  color: Color;
  indexNumber?: number;
  mana_cost?: string;
  manaValue?: number;
  type?: string;
  typeCategory?: string;
  image?: string;
  back?: {
    name: string;
    type: string;
    image: string;
  };
};

export type CardBuckets = { [key in Color]?: Card[] };

export type Pack = {
  packNum: number;
  cards: Card[];
};
