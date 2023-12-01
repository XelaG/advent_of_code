const fs = require("fs");

const r =
  /((one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|\d){1}/g;
const rReversed =
  /((eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)|\d){1}/g;

const wordToValueMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

const input = fs
  .readFileSync("../input", { encoding: "utf8", flag: "r" })
  .split("\n");

const codes = input.map((line) => {
  const firstValue = line.match(r)[0];
  const lastValue = line
    .split("")
    .reverse()
    .join("")
    .match(rReversed)?.[0]
    .split("")
    .reverse()
    .join("");

  return [wordToValueMap[firstValue], wordToValueMap[lastValue]];
});

const result = codes
  .map((code) => parseInt(code.join("")))
  .reduce((prev, curr) => prev + curr, 0);
console.log(result);
