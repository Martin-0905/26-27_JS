let txt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at.";
function f1() {
  console.log(txt.slice(0, 5));
}
function f2() {
  console.log(txt.slice(2, 8));
}
function f3() {
  console.log(txt.slice(4));
}
function f4() {
  // console.log(txt.substr(4, 6));
  console.log(txt.slice(4, 10));
}
function f5() {
  console.log(txt.toUpperCase());
}
function f6() {
  let splittxt = txt.split("");
  let newtxt = "";
  for (let i = 0; i < txt.length; i++) {
    if (i % 2 == 1) newtxt += splittxt[i].toUpperCase();
    else newtxt += splittxt[i].toLowerCase();
  }
  console.log(newtxt);
}
function f7() {
  console.log(txt.replaceAll("e", "E"));
}
function f8() {
  console.log(txt.split("e"));
}
f1();
f2();
f3();
f4();
f5();
f6();
f7();
f8();
