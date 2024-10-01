// Shuffles and returns a shallow copy of the array using the Fisher-Yates algorithm
export function shuffleArray(oldArray: any[]): any[] {
  var j, x, i;
  var newArray = oldArray;
  for (i = newArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = x;
  }
  return newArray;
}

// Converts [Color.White, Color.Blue, etc...] into an object like {[Color.White]: 0, [Color.Blue]: 1, etc...}
export function arrayToValueKeyObject(arr) {
  return arr.reduce((acc, value, index) => {
    acc[value] = index;
    return acc;
  }, {});
}
