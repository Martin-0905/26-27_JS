import input from "./input.js";

let a = +(await input("Kérem a súlyát (kg): "));
let b = +(await input("Kérem a magasságát (m): "));

console.log(`Az ön BMI-je ${a / (b * b)}`);
