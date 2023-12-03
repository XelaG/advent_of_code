const fs = require("fs");

const input = fs
  .readFileSync("../input", { encoding: "utf8", flag: "r" })
  .split("\n")
  .map((line) => line.replace("\r", "").split(""));

const nbOfLine = input.length;
const lengthOfLine = input[0].length;

const generateCoordinatesToCheck = (x, y) => {
  const coordinates = [];
  coordinates.push([x - 1, y - 1]);
  coordinates.push([x - 1, y]);
  coordinates.push([x - 1, y + 1]);
  coordinates.push([x, y + 1]);
  coordinates.push([x + 1, y]);
  coordinates.push([x + 1, y + 1]);
  coordinates.push([x, y - 1]);
  coordinates.push([x + 1, y - 1]);
  return coordinates.filter(
    (c) => c[0] < nbOfLine && c[0] >= 0 && c[1] < lengthOfLine && c[1] >= 0,
  );
};

const isSymbol = (char) => {
  return !["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(
    char,
  );
};

const isNumber = (char) => {
  return !isNaN(parseInt(char));
};

const gearRatios = [];

input.forEach((line, xCoordinate) => {
  line.forEach((char, yCoordinate) => {
    if (!isSymbol(char)) return;
    const partNbOfThisSymbol = [];
    const coordinatesToCheck = generateCoordinatesToCheck(
      xCoordinate,
      yCoordinate,
    );
    coordinatesToCheck.forEach((coordinate) => {
      const x = coordinate[0];
      const y = coordinate[1];
      const value = input[x][y];
      if (isNumber(value)) {
        const foundNumber = [parseInt(value)];
        input[x][y] = ".";
        for (i = y - 1; y >= 0; i--) {
          const previousVal = input[x][i];
          if (isNumber(previousVal)) {
            input[x][i] = ".";
            foundNumber.unshift(previousVal);
          } else {
            break;
          }
        }
        for (i = y + 1; y < lengthOfLine; i++) {
          const previousVal = input[x][i];
          if (isNumber(previousVal)) {
            input[x][i] = ".";
            foundNumber.push(previousVal);
          } else {
            break;
          }
        }
        partNbOfThisSymbol.push(parseInt(foundNumber.join("")));
      }
    });
    if (partNbOfThisSymbol.length === 2) {
      const gearRatio = partNbOfThisSymbol.reduce((prev, curr) => {
        return prev * curr;
      }, 1);
      gearRatios.push(gearRatio);
    }
  });
});

const result = gearRatios.reduce((prev, curr) => {
  return prev + curr;
}, 0);
console.log(result);
