import input from "./input.js";

let a = +(await input("Kérek egy számot: "));
let b = +(await input("Kérek mégegy számot: "));

console.log(b + a);
console.log(b - a);
console.log(a * b);
console.log(a / b);
console.log(Math.trunc(a / b));
console.log(a % b);
