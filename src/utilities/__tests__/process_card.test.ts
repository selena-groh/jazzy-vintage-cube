import {
  splitManaCostIntoArray,
  getManaValueFromCost,
  getColorFromCard,
  getTypeCategory,
} from "../process_card";

describe("splitManaCostIntoArray", () => {
  test.each([
    ["", []],
    ["{W}", ["{W}"]],
    ["{W}{U}{B}{R}{G}", ["{W}", "{U}", "{B}", "{R}", "{G}"]],
    ["{1}{G}", ["{1}", "{G}"]],
    ["{W/G}{P}", ["{W/G}", "{P}"]],
    ["{10}", ["{10}"]],
    ["{10/G}", ["{10/G}"]],
  ])('mana_cost "%s" becomes "%s"', (mana_cost, expected) => {
    expect(splitManaCostIntoArray(mana_cost)).toEqual(expected);
  });
  test.each([["{"], ["{W"], ["{}"], ["{Q}"]])(
    'mana_cost "%s" throws Error "Invalid Mana Cost"',
    (mana_cost) => {
      expect(() => splitManaCostIntoArray(mana_cost)).toThrow(
        "Invalid Mana Cost"
      );
    }
  );
});

describe("getManaValueFromCost", () => {
  test.each([
    ["", 0],
    ["{W}", 1],
    ["{W}{U}{B}{R}{G}", 5],
    ["{1}{G}", 2],
    ["{2}{G}", 3],
    ["{10}{G}", 11],
    ["{W/G}{P}", 2],
    ["{X}{2}", 2],
    ["{2/W}", 2],
    ["{X/W}", 1],
    ["{R/W}", 1],
    ["{1}{G}{R/W}{2/G}{P}", 6],
    ["{0}", 0],
  ])('mana_cost "%s" has mana value "%s"', (mana_cost, expected) => {
    expect(getManaValueFromCost(mana_cost)).toEqual(expected);
  });
});

describe("getTypeCategory", () => {
  test.each([
    ["Legendary Planeswalker", "Planeswalker"],
    ["Land Planeswalker", "Land"],
    ["Artifact Planeswalker", "Planeswalker"],
    ["Legendary Artifact Creature", "Creature"],
    ["Artifact Enchantment", "Artifact"],
    ["Enchantment Artifact Creature", "Creature"],
    ["Prophecy", "Prophecy"],
    ["Legendary Snow Land", "Land"],
    ["Kindred Enchantment", "Enchantment"],
  ])('type "%s" has type category "%s"', (type, expected) => {
    expect(getTypeCategory(type)).toEqual(expected);
  });
  test.each([["Invalid Type"]])(
    'type "%s" throws Error "Could not calculate type category"',
    (type) => {
      expect(() => getTypeCategory(type)).toThrow(
        "Could not calculate type category"
      );
    }
  );
});

describe("getColorFromCard", () => {
  test.each([
    {
      card: {
        name: "Fy'Alari, the Guiding",
        mana_cost: "",
        type: "Legendary Creature Land",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/FyAlari the Guiding.png",
      },
      color: "Land",
    },
    {
      card: {
        name: "A God from the Ashes",
        mana_cost: "",
        type: "Prophecy",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/A God from the Ashes.png",
      },
      color: "Multicolored",
    },
    {
      card: {
        name: "Emrakul, Who Shattered the Moon",
        mana_cost: "",
        type: "Legendary Creature",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Emrakul Who Shattered the Moon.png",
      },
      color: "Colorless",
    },
    {
      card: {
        name: "Galactic Palm",
        mana_cost: "{X}{U}{R}",
        type: "Instant",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Galactic Palm.png",
      },
      color: "Multicolored",
    },
    {
      card: {
        name: "Ghost Shadow Lotus",
        mana_cost: "{0}",
        type: "Artifact",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Ghost Shadow Lotus.png",
      },
      color: "Colorless",
    },
    {
      card: {
        name: "Grafted Spy Network",
        mana_cost: "{U/P}",
        type: "Instant",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Grafted Spy Network.png",
      },
      color: "Blue",
    },
    {
      card: {
        name: "Phyrexian Trading Post",
        mana_cost: "{P}",
        type: "Artifact",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Phyrexian Trading Post.png",
      },
      color: "Colorless",
    },
    {
      card: {
        name: "Piranai, The Blighted Bloom",
        mana_cost: "{B/G}",
        type: "Legendary Creature",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Piranai The Blighted Bloom.png",
      },
      color: "Multicolored",
    },
    {
      card: {
        name: "Ravnican Renaissance",
        mana_cost: "{U}{U}{U}",
        type: "Instant",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Ravnican Renaissance.png",
      },
      color: "Blue",
    },
    {
      card: {
        name: "Shape the Shadows",
        mana_cost: "{G}{G}{U}{U}",
        type: "Sorcery",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Shape the Shadows.png",
      },
      color: "Multicolored",
    },
  ])('card "$card.name" has color "$color"', ({ card, color }) => {
    expect(getColorFromCard(card)).toEqual(color);
  });
});
