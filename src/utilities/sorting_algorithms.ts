import {
  Card,
  CardBuckets,
  Color,
  ColorOrderIndices,
  TypeCategoryOrderIndices,
} from "./magic_types";

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

// default table sort in order:
// - sort by color (in color order, see cube cobra)
// for WUBRG + colorless:
// - sort by type (creature, then every other type in alphabetical order)
// - sort by mana value (integer) (show line separating mana values)
// - sort by name
// for multicolor:
// - sort by prophecy first (on top)
// - sort by confusing names (color identity)
// - sort by mana value
// - sort by name
// for lands:
// - sort by name
export function defaultTableSort(a: Card, b: Card): number {
  const aColorIndex = ColorOrderIndices[a.color];
  const bColorIndex = ColorOrderIndices[b.color];
  const aTypeCategoryIndex = a.typeCategory
    ? TypeCategoryOrderIndices[a.typeCategory]
    : 99;
  const bTypeCategoryIndex = b.typeCategory
    ? TypeCategoryOrderIndices[b.typeCategory]
    : 99;

  if (aColorIndex < bColorIndex) {
    return -1;
  } else if (aColorIndex > bColorIndex) {
    return 1;
  } else if (a.color !== Color.Land) {
    // TODO: multicolor has different sorting, need to add it
    if (aTypeCategoryIndex < bTypeCategoryIndex) {
      return -1;
    } else if (aTypeCategoryIndex > bTypeCategoryIndex) {
      return 1;
    }
    const aManaValue = a.manaValue || 0;
    const bManaValue = b.manaValue || 0;
    if (aManaValue < bManaValue) {
      return -1;
    } else if (aManaValue > bManaValue) {
      return 1;
    }
  }

  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

// default gallery sort
// - sort by color (in color order, see cube cobra)
// - alphabetically
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
