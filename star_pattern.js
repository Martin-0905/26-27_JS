function rightHalfPyramid() {
  for (let i = 1; i < 6; i++) {
    console.log("* ".repeat(i));
  }
}
function leftHalfPyramid() {
  for (let i = 1; i < 6; i++) {
    console.log(" ".repeat((5 - i) * 2) + "* ".repeat(i));
  }
}
function fullPyramid() {
  for (let i = 1; i < 6; i++) {
    console.log(" ".repeat(5 - i) + "* ".repeat(i));
  }
}
function invertedRightHalfPyramid() {
  for (let i = 1; i < 6; i++) {
    console.log("* ".repeat(6 - i));
  }
}
function invertedLeftHalfPyramid() {
  for (let i = 1; i < 6; i++) {
    console.log(" ".repeat((4 - (5 - i)) * 2) + "* ".repeat(6 - i));
  }
}

// rightHalfPyramid();
// leftHalfPyramid();
// fullPyramid();
// invertedRightHalfPyramid();
// invertedLeftHalfPyramid();

function hollowFullPyramid() {
  for (let i = 1; i < 6; i++) {
    console.log(
      " ".repeat(5 - i) +
        "*" +
        (i == 5 ? " *".repeat(i - 1) : " ".repeat(Math.max(i * 2 - 3, 0))) +
        (i == 1 || i == 5 ? "" : "*"),
    );
  }
}

hollowFullPyramid();
