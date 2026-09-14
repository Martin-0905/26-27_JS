import input from `./input.js`;

let a = await input("Kérek egy szót: ");
function reverse(str) {
  let letters = str.split("");
  letters[0] = letters[0].toUpperCase();
  return letters.reverse().join("");
}

console.log(reverse(a));
