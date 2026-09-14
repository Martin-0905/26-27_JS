import input from "./input.js";

let a = +(await input("Mérföld: "));

console.log(`${a * 1.60934} km`);
