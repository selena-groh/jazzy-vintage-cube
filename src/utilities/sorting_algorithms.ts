import {
  Card,
  Color,
  ColorBuckets,
  ColorOrderIndices,
  ManaValueBuckets,
  TypeCategory,
  TypeCategoryBuckets,
  TypeCategoryOrderIndices,
} from "./magic_types";

export function bucketCardsByColor(cards: Card[]): ColorBuckets {
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

export function bucketCardsByTypeCategory(cards: Card[]): TypeCategoryBuckets {
  return {
    [TypeCategory.Prophecy]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Prophecy
    ),
    [TypeCategory.Creature]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Creature
    ),
    [TypeCategory.Planeswalker]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Planeswalker
    ),
    [TypeCategory.Instant]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Instant
    ),
    [TypeCategory.Sorcery]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Sorcery
    ),
    [TypeCategory.Artifact]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Artifact
    ),
    [TypeCategory.Enchantment]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Enchantment
    ),
    [TypeCategory.Land]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Land
    ),
    [TypeCategory.Battle]: cards.filter(
      (card) => card.typeCategory === TypeCategory.Battle
    ),
  };
}

export function bucketCardsByManaValue(cards: Card[]): ManaValueBuckets {
  return cards.reduce((acc, card) => {
    const key = card.manaValue ?? 99;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(card);
    return acc;
  }, {});
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
  const aColorIndex = ColorOrderIndices[a.color] ?? 99;
  const bColorIndex = ColorOrderIndices[b.color] ?? 99;
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
    const aManaValue = a.manaValue;
    const bManaValue = b.manaValue;
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
  const aColorIndex = ColorOrderIndices[a.color] ?? 99;
  const bColorIndex = ColorOrderIndices[b.color] ?? 99;

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
