import input from "./input.js";

const SECONDS_PER_DAY = 86400;
let currentHours = +(await input("Hány óra van? "));
let currentMinutes = +(await input("Hány perc van? "));
let currentSeconds = +(await input("Hány másodperc van? "));

console.log(
  `Még ${SECONDS_PER_DAY - (currentHours * 60 + currentMinutes) * 60 + currentSeconds} másodperc van hátra.`,
);
