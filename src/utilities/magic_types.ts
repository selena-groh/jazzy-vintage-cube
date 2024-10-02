import { arrayToValueKeyObject } from "./utility_functions";

type ColorSymbol = "W" | "U" | "B" | "R" | "G" | "P" | "C";
type HybridColorSymbol = `${ColorSymbol | number}/${ColorSymbol}`;
type ManaSymbol = ColorSymbol | HybridColorSymbol | number | "X" | "Y";
export type ManaCost = `{${ManaSymbol}}`;

export const ManaCostRegex = /\{[WUBRGPCXY\d](?:\d)*(?:\/[WUBRGPCXY])*\}/;

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

export const ColorOrderIndices = arrayToValueKeyObject(COLOR_ORDER);

export const MANA_AFFECTING_CARD_COLOR = ["W", "U", "B", "R", "G"];

export const MANA_AFFECTING_MANA_VALUE = new RegExp("[WUBRGPC]", "i");

export enum TypeCategory {
  Land = "Land",
  Planeswalker = "Planeswalker",
  Creature = "Creature",
  Artifact = "Artifact",
  Enchantment = "Enchantment",
  Instant = "Instant",
  Sorcery = "Sorcery",
  Prophecy = "Prophecy",
  Battle = "Battle",
}

export const TYPE_CATEGORY_ORDER = [
  TypeCategory.Prophecy,
  TypeCategory.Creature,
  TypeCategory.Planeswalker,
  TypeCategory.Instant,
  TypeCategory.Sorcery,
  TypeCategory.Artifact,
  TypeCategory.Enchantment,
  TypeCategory.Land,
  TypeCategory.Battle,
];

export const TypeCategoryOrderIndices =
  arrayToValueKeyObject(TYPE_CATEGORY_ORDER);

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

export type ColorBuckets = { [key in Color]: Card[] };
export type TypeCategoryBuckets = { [key in TypeCategory]: Card[] };
export type ManaValueBuckets = { [key: number]: Card[] };
export type BucketsForTable = {
  [key in keyof ColorBuckets]: {
    [key in TypeCategory]: { [key: number]: Card[] };
  };
};

export type Pack = {
  packNum?: number;
  cards: Card[];
};
