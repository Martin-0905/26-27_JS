import input from "./input.js";

let szam1 = +(await input("Adjon meg egy számot: "));
let szam2 = +(await input("Adjon meg mégegy számot: "));

console.log(szam1 + szam2);
