import input from "./input.js";

let a = +(await input("Kérem az első oldal méretét: "));
let b = +(await input("Kérem a második oldal méretét: "));
let c = +(await input("Kérem a harmadik oldal méretét: "));

function surfaceArea(l, w, h) {
  return 2 * (l * w + w * h + l * h);
}

function volume(l, w, h) {
  return l * w * h;
}

console.log(`Felszín: ${surfaceArea(a, b, c)}`);
console.log(`Térfogat: ${volume(a, b, c)}`);
