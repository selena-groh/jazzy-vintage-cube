import { sortDeep } from "../deep_sort";
import { Card } from "../magic_types";

const TEST_DATA = [
  {
    name: "The Grand Imperial Museum",
    mana_cost: "",
    type: "Legendary Artifact Land",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Grand Imperial Museum.png",
    color: "Land",
    manaValue: 0,
    typeCategory: "Land",
  },
  {
    name: "Jan Sul, Mirran Guardian",
    mana_cost: "{4}",
    type: "Legendary Artifact Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Jan Sul Mirran Guardian.png",
    color: "Colorless",
    manaValue: 4,
    typeCategory: "Creature",
  },
  {
    name: "Dreadship Raider",
    mana_cost: "{B}",
    type: "Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Dreadship Raider.png",
    color: "Black",
    manaValue: 1,
    typeCategory: "Creature",
  },
  {
    name: "Seductive Bargain",
    mana_cost: "{B}",
    type: "Sorcery",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Seductive Bargain.png",
    color: "Black",
    manaValue: 1,
    typeCategory: "Sorcery",
  },
  {
    name: "Acolyte of Yawgmoth",
    mana_cost: "{2}{B}{B}",
    type: "Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Acolyte of Yawgmoth.png",
    color: "Black",
    manaValue: 4,
    typeCategory: "Creature",
  },
  {
    name: "The Drowned Queen",
    mana_cost: "{U}{B}",
    type: "Legendary Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Drowned Queen.png",
    color: "Multicolored",
    manaValue: 2,
    typeCategory: "Artifact",
  },
  {
    name: "Night-Eyes Totem",
    mana_cost: "{2}",
    type: "Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Night-Eyes Totem.png",
    color: "Colorless",
    manaValue: 2,
    typeCategory: "Artifact",
  },
  {
    name: "Umaule, Elder Oneiromancer",
    mana_cost: "{1}{U}{U}",
    type: "Legendary Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Umaule Elder Oneiromancer.png",
    color: "Blue",
    manaValue: 3,
    typeCategory: "Creature",
  },
  {
    name: "Black Book of Hermaeus Mora",
    mana_cost: "{B}{G}{U}",
    type: "Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Black Book of Hermaeus Mora.png",
    color: "Multicolored",
    manaValue: 3,
    typeCategory: "Artifact",
  },
  {
    name: "Eldritch Flame",
    mana_cost: "{1}{R}",
    type: "Instant",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Eldritch Flame.png",
    color: "Red",
    manaValue: 2,
    typeCategory: "Instant",
  },
  {
    name: "Frostlance Barrage",
    mana_cost: "{R}{G}",
    type: "Snow Instant",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Frostlance Barrage.png",
    color: "Multicolored",
    manaValue: 2,
    typeCategory: "Instant",
  },
  {
    name: "Hell of a Time",
    mana_cost: "{R}",
    type: "Enchantment",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Hell of a Time.png",
    color: "Red",
    manaValue: 1,
    typeCategory: "Enchantment",
  },
  {
    name: "Vircek Extraction",
    mana_cost: "{B}",
    type: "Sorcery",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Vircek Extraction.png",
    color: "Black",
    manaValue: 1,
    typeCategory: "Sorcery",
  },
  {
    name: "Mindresdorth, Dragon Realm",
    mana_cost: "",
    type: "Legendary Land",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Mindresdorth Dragon Realm.png",
    color: "Land",
    manaValue: 0,
    typeCategory: "Land",
  },
  {
    name: "Captain Greylock, the Undertow",
    mana_cost: "{1}{R}",
    type: "Legendary Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Captain Greylock the Undertow.png",
    color: "Red",
    manaValue: 2,
    typeCategory: "Creature",
  },
  {
    name: "Premonition Engine",
    mana_cost: "{1}{U}",
    type: "Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Premonition Engine.png",
    color: "Blue",
    manaValue: 2,
    typeCategory: "Artifact",
  },
  {
    name: "Brass Marauder",
    mana_cost: "{2}",
    type: "Artifact Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Brass Marauder.png",
    color: "Colorless",
    manaValue: 2,
    typeCategory: "Creature",
  },
  {
    name: "The Mantle of Rule",
    mana_cost: "{1}{W}{W}",
    type: "Legendary Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Mantle of Rule.png",
    color: "White",
    manaValue: 3,
    typeCategory: "Artifact",
  },
  {
    name: "Cosmic Conscription",
    mana_cost: "{1}{B}{R}",
    type: "Sorcery",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Cosmic Conscription.png",
    color: "Multicolored",
    manaValue: 3,
    typeCategory: "Sorcery",
  },
  {
    name: "Tal Dagoth, Lord of Nightmares",
    mana_cost: "{1}{B}",
    type: "Legendary Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Tal Dagoth Lord of Nightmares.png",
    color: "Black",
    manaValue: 2,
    typeCategory: "Creature",
  },
  {
    name: "Reclamation of Zendikar",
    mana_cost: "{2}{G}",
    type: "Enchantment",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Reclamation of Zendikar.png",
    color: "Green",
    manaValue: 3,
    typeCategory: "Enchantment",
  },
  {
    name: "Psychopomp's Ferry",
    mana_cost: "{2}",
    type: "Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Psychopomps Ferry.png",
    color: "Colorless",
    manaValue: 2,
    typeCategory: "Artifact",
  },
  {
    name: "Obsidian Aurora",
    mana_cost: "{1}",
    type: "Enchantment Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Obsidian Aurora.png",
    color: "Colorless",
    manaValue: 1,
    typeCategory: "Artifact",
  },
  {
    name: "Zruareki Shrine",
    mana_cost: "",
    type: "Legendary Land",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Zruareki Shrine.png",
    color: "Land",
    manaValue: 0,
    typeCategory: "Land",
  },
  {
    name: "Kinkiba, Who Coils The Leash",
    mana_cost: "{2}{B}",
    type: "Legendary Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Kinkiba Who Coils The Leash.png",
    color: "Black",
    manaValue: 3,
    typeCategory: "Creature",
  },
  {
    name: "Temur Spirit Conduit",
    mana_cost: "{G}",
    type: "Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Temur Spirit Conduit.png",
    color: "Green",
    manaValue: 1,
    typeCategory: "Creature",
  },
  {
    name: "Daratrine, Questing Flame",
    mana_cost: "{1}{R}",
    type: "Legendary Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Daratrine Questing Flame.png",
    color: "Red",
    manaValue: 2,
    typeCategory: "Creature",
  },
  {
    name: "Settlers of Catan",
    mana_cost: "{G/W}{U}",
    type: "Sorcery",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Settlers of Catan.png",
    color: "Multicolored",
    manaValue: 2,
    typeCategory: "Sorcery",
  },
  {
    name: "The Predator City",
    mana_cost: "",
    type: "Legendary Artifact Land",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Predator City.png",
    color: "Land",
    manaValue: 0,
    typeCategory: "Land",
  },
  {
    name: "Embrace the Nightmare",
    mana_cost: "{4}{B}{B}",
    type: "Sorcery",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Embrace the Nightmare.png",
    color: "Black",
    manaValue: 6,
    typeCategory: "Sorcery",
  },
] as Card[];

// TODO: enhance these tests to be more than snapshots

describe("sortDeep", () => {
  it("groups cards consistently", () => {
    expect(
  sortDeep(
    TEST_DATA,
    true,
    "Alphabetical",
    "Color Category",
    "Types-Multicolor",
    "Mana Value"
  )
).toMatchInlineSnapshot(`
[
  [
    "White",
    [
      [
        "Artifact",
        [
          [
            "3",
            [
              {
                "color": "White",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Mantle of Rule.png",
                "manaValue": 3,
                "mana_cost": "{1}{W}{W}",
                "name": "The Mantle of Rule",
                "type": "Legendary Artifact",
                "typeCategory": "Artifact",
              },
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "Blue",
    [
      [
        "Creature",
        [
          [
            "3",
            [
              {
                "color": "Blue",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Umaule Elder Oneiromancer.png",
                "manaValue": 3,
                "mana_cost": "{1}{U}{U}",
                "name": "Umaule, Elder Oneiromancer",
                "type": "Legendary Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
        ],
      ],
      [
        "Artifact",
        [
          [
            "2",
            [
              {
                "color": "Blue",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Premonition Engine.png",
                "manaValue": 2,
                "mana_cost": "{1}{U}",
                "name": "Premonition Engine",
                "type": "Artifact",
                "typeCategory": "Artifact",
              },
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "Black",
    [
      [
        "Creature",
        [
          [
            "1",
            [
              {
                "color": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Dreadship Raider.png",
                "manaValue": 1,
                "mana_cost": "{B}",
                "name": "Dreadship Raider",
                "type": "Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
          [
            "2",
            [
              {
                "color": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Tal Dagoth Lord of Nightmares.png",
                "manaValue": 2,
                "mana_cost": "{1}{B}",
                "name": "Tal Dagoth, Lord of Nightmares",
                "type": "Legendary Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
          [
            "3",
            [
              {
                "color": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Kinkiba Who Coils The Leash.png",
                "manaValue": 3,
                "mana_cost": "{2}{B}",
                "name": "Kinkiba, Who Coils The Leash",
                "type": "Legendary Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
          [
            "4",
            [
              {
                "color": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Acolyte of Yawgmoth.png",
                "manaValue": 4,
                "mana_cost": "{2}{B}{B}",
                "name": "Acolyte of Yawgmoth",
                "type": "Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
        ],
      ],
      [
        "Sorcery",
        [
          [
            "1",
            [
              {
                "color": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Seductive Bargain.png",
                "manaValue": 1,
                "mana_cost": "{B}",
                "name": "Seductive Bargain",
                "type": "Sorcery",
                "typeCategory": "Sorcery",
              },
              {
                "color": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Vircek Extraction.png",
                "manaValue": 1,
                "mana_cost": "{B}",
                "name": "Vircek Extraction",
                "type": "Sorcery",
                "typeCategory": "Sorcery",
              },
            ],
          ],
          [
            "6",
            [
              {
                "color": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Embrace the Nightmare.png",
                "manaValue": 6,
                "mana_cost": "{4}{B}{B}",
                "name": "Embrace the Nightmare",
                "type": "Sorcery",
                "typeCategory": "Sorcery",
              },
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "Red",
    [
      [
        "Creature",
        [
          [
            "2",
            [
              {
                "color": "Red",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Captain Greylock the Undertow.png",
                "manaValue": 2,
                "mana_cost": "{1}{R}",
                "name": "Captain Greylock, the Undertow",
                "type": "Legendary Creature",
                "typeCategory": "Creature",
              },
              {
                "color": "Red",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Daratrine Questing Flame.png",
                "manaValue": 2,
                "mana_cost": "{1}{R}",
                "name": "Daratrine, Questing Flame",
                "type": "Legendary Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
        ],
      ],
      [
        "Instant",
        [
          [
            "2",
            [
              {
                "color": "Red",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Eldritch Flame.png",
                "manaValue": 2,
                "mana_cost": "{1}{R}",
                "name": "Eldritch Flame",
                "type": "Instant",
                "typeCategory": "Instant",
              },
            ],
          ],
        ],
      ],
      [
        "Enchantment",
        [
          [
            "1",
            [
              {
                "color": "Red",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Hell of a Time.png",
                "manaValue": 1,
                "mana_cost": "{R}",
                "name": "Hell of a Time",
                "type": "Enchantment",
                "typeCategory": "Enchantment",
              },
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "Green",
    [
      [
        "Creature",
        [
          [
            "1",
            [
              {
                "color": "Green",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Temur Spirit Conduit.png",
                "manaValue": 1,
                "mana_cost": "{G}",
                "name": "Temur Spirit Conduit",
                "type": "Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
        ],
      ],
      [
        "Enchantment",
        [
          [
            "3",
            [
              {
                "color": "Green",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Reclamation of Zendikar.png",
                "manaValue": 3,
                "mana_cost": "{2}{G}",
                "name": "Reclamation of Zendikar",
                "type": "Enchantment",
                "typeCategory": "Enchantment",
              },
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "Multicolored",
    [
      [
        "Instant",
        [
          [
            "2",
            [
              {
                "color": "Multicolored",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Frostlance Barrage.png",
                "manaValue": 2,
                "mana_cost": "{R}{G}",
                "name": "Frostlance Barrage",
                "type": "Snow Instant",
                "typeCategory": "Instant",
              },
            ],
          ],
        ],
      ],
      [
        "Sorcery",
        [
          [
            "2",
            [
              {
                "color": "Multicolored",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Settlers of Catan.png",
                "manaValue": 2,
                "mana_cost": "{G/W}{U}",
                "name": "Settlers of Catan",
                "type": "Sorcery",
                "typeCategory": "Sorcery",
              },
            ],
          ],
          [
            "3",
            [
              {
                "color": "Multicolored",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Cosmic Conscription.png",
                "manaValue": 3,
                "mana_cost": "{1}{B}{R}",
                "name": "Cosmic Conscription",
                "type": "Sorcery",
                "typeCategory": "Sorcery",
              },
            ],
          ],
        ],
      ],
      [
        "Artifact",
        [
          [
            "2",
            [
              {
                "color": "Multicolored",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Drowned Queen.png",
                "manaValue": 2,
                "mana_cost": "{U}{B}",
                "name": "The Drowned Queen",
                "type": "Legendary Artifact",
                "typeCategory": "Artifact",
              },
            ],
          ],
          [
            "3",
            [
              {
                "color": "Multicolored",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Black Book of Hermaeus Mora.png",
                "manaValue": 3,
                "mana_cost": "{B}{G}{U}",
                "name": "Black Book of Hermaeus Mora",
                "type": "Artifact",
                "typeCategory": "Artifact",
              },
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "Colorless",
    [
      [
        "Creature",
        [
          [
            "2",
            [
              {
                "color": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Brass Marauder.png",
                "manaValue": 2,
                "mana_cost": "{2}",
                "name": "Brass Marauder",
                "type": "Artifact Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
          [
            "4",
            [
              {
                "color": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Jan Sul Mirran Guardian.png",
                "manaValue": 4,
                "mana_cost": "{4}",
                "name": "Jan Sul, Mirran Guardian",
                "type": "Legendary Artifact Creature",
                "typeCategory": "Creature",
              },
            ],
          ],
        ],
      ],
      [
        "Artifact",
        [
          [
            "1",
            [
              {
                "color": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Obsidian Aurora.png",
                "manaValue": 1,
                "mana_cost": "{1}",
                "name": "Obsidian Aurora",
                "type": "Enchantment Artifact",
                "typeCategory": "Artifact",
              },
            ],
          ],
          [
            "2",
            [
              {
                "color": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Night-Eyes Totem.png",
                "manaValue": 2,
                "mana_cost": "{2}",
                "name": "Night-Eyes Totem",
                "type": "Artifact",
                "typeCategory": "Artifact",
              },
              {
                "color": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Psychopomps Ferry.png",
                "manaValue": 2,
                "mana_cost": "{2}",
                "name": "Psychopomp's Ferry",
                "type": "Artifact",
                "typeCategory": "Artifact",
              },
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "Land",
    [
      [
        "Land",
        [
          [
            "0",
            [
              {
                "color": "Land",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Mindresdorth Dragon Realm.png",
                "manaValue": 0,
                "mana_cost": "",
                "name": "Mindresdorth, Dragon Realm",
                "type": "Legendary Land",
                "typeCategory": "Land",
              },
              {
                "color": "Land",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Grand Imperial Museum.png",
                "manaValue": 0,
                "mana_cost": "",
                "name": "The Grand Imperial Museum",
                "type": "Legendary Artifact Land",
                "typeCategory": "Land",
              },
              {
                "color": "Land",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Predator City.png",
                "manaValue": 0,
                "mana_cost": "",
                "name": "The Predator City",
                "type": "Legendary Artifact Land",
                "typeCategory": "Land",
              },
              {
                "color": "Land",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Zruareki Shrine.png",
                "manaValue": 0,
                "mana_cost": "",
                "name": "Zruareki Shrine",
                "type": "Legendary Land",
                "typeCategory": "Land",
              },
            ],
          ],
        ],
      ],
    ],
  ],
]
`);
  });
});
