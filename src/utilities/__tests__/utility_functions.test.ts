import { arrayToValueKeyObject } from "../utility_functions";

describe("arrayToValueKeyObject", () => {
  test.each([
    {
      arr: [],
      expected: {},
    },
    {
      arr: ["a"],
      expected: { a: 0 },
    },
    {
      arr: ["a", "b", "c"],
      expected: { a: 0, b: 1, c: 2 },
    },
    {
      arr: [2, 7, 20],
      expected: { 2: 0, 7: 1, 20: 2 },
    },
  ])("array $arr becomes $expected", ({ arr, expected }) => {
    expect(arrayToValueKeyObject(arr)).toEqual(expected);
  });
});
