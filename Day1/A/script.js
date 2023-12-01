const fs = require("fs");

const r = /\d{1}/g;

const input = fs
  .readFileSync("../input", { encoding: "utf8", flag: "r" })
  .split("\n");

const codes = input.map((line) => {
  const result = line.match(r) || [];
  return result.length > 1
    ? [result[0], result[result.length - 1]]
    : [result[0], result[0]];
});

const result = codes
  .map((code) => parseInt(code.join("")))
  .reduce((prev, curr) => prev + curr, 0);
console.log(result);
