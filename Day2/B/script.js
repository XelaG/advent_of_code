const fs = require("fs");

const input = fs
  .readFileSync("../input", { encoding: "utf8", flag: "r" })
  .split("\n");

const nbMaxOfCube = {
  red: 12,
  green: 13,
  blue: 14,
};

const nbOfCubesPerLine = input.map((line) => {
  const obj = [];
  const sets = line
    .split(":")[1]
    .split(";")
    .map((s) => s.split(","));
  sets.forEach((set, idx) => {
    const setObj = {};
    set.forEach((value) => {
      const keyValueArray = value.replace("\r", "").split(" ");
      setObj[keyValueArray[2]] = keyValueArray[1];
    });
    obj.push(setObj);
  });

  const mostOccurences = {
    blue: Math.max(...obj.map((set) => parseInt(set?.blue) || 0)),
    red: Math.max(...obj.map((set) => parseInt(set?.red) || 0)),
    green: Math.max(...obj.map((set) => parseInt(set?.green) || 0)),
  };
  return mostOccurences;
});

const result = nbOfCubesPerLine.reduce((prev, curr, idx) => {
  return prev + curr.blue * curr.red * curr.green;
}, 0);

console.log(result);
