import { sortDeep } from "../deep_sort";
import { Card } from "../magic_types";

const TEST_DATA = [
  {
    name: "Captain's Command",
    mana_cost: "{X}{U}",
    type: "Instant",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Captains Command.png",
    color: "Blue",
    colorIdentity: ["U"],
    faction: "Blue",
    manaValue: 1,
    typeCategory: "Instant",
  },
  {
    name: "Dawn of Growth",
    mana_cost: "{G}",
    type: "Instant",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Dawn of Growth.png",
    color: "Green",
    colorIdentity: ["G"],
    faction: "Green",
    manaValue: 1,
    typeCategory: "Instant",
  },
  {
    name: "White Lotus",
    mana_cost: "{0}",
    type: "Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/White Lotus.png",
    color: "Colorless",
    colorIdentity: [],
    faction: "Colorless",
    manaValue: 0,
    typeCategory: "Artifact",
  },
  {
    name: "Ruined Metropolis",
    mana_cost: "",
    type: "Land",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Ruined Metropolis.png",
    color: "Land",
    colorIdentity: [],
    faction: "Colorless",
    manaValue: 0,
    typeCategory: "Land",
  },
  {
    name: "Blood Crystal Cavern",
    mana_cost: "",
    type: "Artifact Land",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Blood Crystal Cavern.png",
    color: "Land",
    colorIdentity: [],
    faction: "Colorless",
    manaValue: 0,
    typeCategory: "Land",
  },
  {
    name: "Destria, Nova Summoner",
    mana_cost: "{2}{R}",
    type: "Legendary Planeswalker",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Destria Nova Summoner.png",
    color: "Red",
    colorIdentity: ["R"],
    faction: "Red",
    manaValue: 3,
    typeCategory: "Planeswalker",
  },
  {
    name: "The Shrike, Lord of Pain",
    mana_cost: "{3}",
    type: "Legendary Artifact Creature",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Shrike Lord of Pain.png",
    color: "Colorless",
    colorIdentity: [],
    faction: "Colorless",
    manaValue: 3,
    typeCategory: "Creature",
  },
  {
    name: "Northern Terminus",
    mana_cost: "",
    type: "Snow Artifact Land",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Northern Terminus.png",
    color: "Land",
    colorIdentity: [],
    faction: "Colorless",
    manaValue: 0,
    typeCategory: "Land",
  },
  {
    name: "Lost Discus",
    mana_cost: "{2}{W}",
    type: "Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Lost Discus.png",
    color: "White",
    colorIdentity: ["W"],
    faction: "White",
    manaValue: 3,
    typeCategory: "Artifact",
  },
  {
    name: "Infernal Council",
    mana_cost: "{1}{B}",
    type: "Enchantment",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Infernal Council.png",
    color: "Black",
    colorIdentity: ["B"],
    faction: "Black",
    manaValue: 2,
    typeCategory: "Enchantment",
  },
  {
    name: "Despair Ex Machina",
    mana_cost: "{2}{U}{U}",
    type: "Sorcery",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Despair Ex Machina.png",
    color: "Blue",
    colorIdentity: ["U"],
    faction: "Blue",
    manaValue: 4,
    typeCategory: "Sorcery",
  },
  {
    name: "Palantir of Qotrixi",
    mana_cost: "{1}",
    type: "Legendary Artifact",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Palantir of Qotrixi.png",
    color: "Colorless",
    colorIdentity: [],
    faction: "Colorless",
    manaValue: 1,
    typeCategory: "Artifact",
  },
  {
    name: "The Witching Hour",
    mana_cost: "{R}{W}{B}",
    type: "Enchantment",
    image:
      "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Witching Hour.png",
    color: "Multicolored",
    colorIdentity: ["W", "B", "R"],
    faction: "Mardu",
    manaValue: 3,
    typeCategory: "Enchantment",
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
                "colorIdentity": [
                  "W",
                ],
                "faction": "White",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Lost Discus.png",
                "manaValue": 3,
                "mana_cost": "{2}{W}",
                "name": "Lost Discus",
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
    "Blue",
    [
      [
        "Instant",
        [
          [
            "1",
            [
              {
                "color": "Blue",
                "colorIdentity": [
                  "U",
                ],
                "faction": "Blue",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Captains Command.png",
                "manaValue": 1,
                "mana_cost": "{X}{U}",
                "name": "Captain's Command",
                "type": "Instant",
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
            "4",
            [
              {
                "color": "Blue",
                "colorIdentity": [
                  "U",
                ],
                "faction": "Blue",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Despair Ex Machina.png",
                "manaValue": 4,
                "mana_cost": "{2}{U}{U}",
                "name": "Despair Ex Machina",
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
    "Black",
    [
      [
        "Enchantment",
        [
          [
            "2",
            [
              {
                "color": "Black",
                "colorIdentity": [
                  "B",
                ],
                "faction": "Black",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Infernal Council.png",
                "manaValue": 2,
                "mana_cost": "{1}{B}",
                "name": "Infernal Council",
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
    "Red",
    [
      [
        "Planeswalker",
        [
          [
            "3",
            [
              {
                "color": "Red",
                "colorIdentity": [
                  "R",
                ],
                "faction": "Red",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Destria Nova Summoner.png",
                "manaValue": 3,
                "mana_cost": "{2}{R}",
                "name": "Destria, Nova Summoner",
                "type": "Legendary Planeswalker",
                "typeCategory": "Planeswalker",
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
        "Instant",
        [
          [
            "1",
            [
              {
                "color": "Green",
                "colorIdentity": [
                  "G",
                ],
                "faction": "Green",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Dawn of Growth.png",
                "manaValue": 1,
                "mana_cost": "{G}",
                "name": "Dawn of Growth",
                "type": "Instant",
                "typeCategory": "Instant",
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
        "Mardu",
        [
          [
            "3",
            [
              {
                "color": "Multicolored",
                "colorIdentity": [
                  "W",
                  "B",
                  "R",
                ],
                "faction": "Mardu",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Witching Hour.png",
                "manaValue": 3,
                "mana_cost": "{R}{W}{B}",
                "name": "The Witching Hour",
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
    "Colorless",
    [
      [
        "Creature",
        [
          [
            "3",
            [
              {
                "color": "Colorless",
                "colorIdentity": [],
                "faction": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/The Shrike Lord of Pain.png",
                "manaValue": 3,
                "mana_cost": "{3}",
                "name": "The Shrike, Lord of Pain",
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
            "0",
            [
              {
                "color": "Colorless",
                "colorIdentity": [],
                "faction": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/White Lotus.png",
                "manaValue": 0,
                "mana_cost": "{0}",
                "name": "White Lotus",
                "type": "Artifact",
                "typeCategory": "Artifact",
              },
            ],
          ],
          [
            "1",
            [
              {
                "color": "Colorless",
                "colorIdentity": [],
                "faction": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Palantir of Qotrixi.png",
                "manaValue": 1,
                "mana_cost": "{1}",
                "name": "Palantir of Qotrixi",
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
                "colorIdentity": [],
                "faction": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Blood Crystal Cavern.png",
                "manaValue": 0,
                "mana_cost": "",
                "name": "Blood Crystal Cavern",
                "type": "Artifact Land",
                "typeCategory": "Land",
              },
              {
                "color": "Land",
                "colorIdentity": [],
                "faction": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Northern Terminus.png",
                "manaValue": 0,
                "mana_cost": "",
                "name": "Northern Terminus",
                "type": "Snow Artifact Land",
                "typeCategory": "Land",
              },
              {
                "color": "Land",
                "colorIdentity": [],
                "faction": "Colorless",
                "image": "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Ruined Metropolis.png",
                "manaValue": 0,
                "mana_cost": "",
                "name": "Ruined Metropolis",
                "type": "Land",
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
