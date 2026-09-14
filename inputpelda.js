import input from "./input.js";

// Változó értékadása
let name = await input("Kérem a neved: ");
console.log(`Szia ${name}!`);

// Függvény hívása
async function getName() {
  name = await input("Adja meg a nevét: ");
  return name;
}

let yourName = await getName();
console.log(`A neved: ${yourName}`);
