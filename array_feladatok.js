function getOtoslottoSzamok() {
  let nums = [];
  for (let i = 0; i < 5; i++) {
    nums.push(Math.floor(Math.random() * 90) + 1);
  }
  return nums;
}

function getSortedNumbers(_nums) {
  let nums = _nums;
  let toggle = false;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i + 1]) {
      if (nums[i] > nums[i + 1]) {
        let temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        toggle = true;
      }
    }
  }
  return toggle ? getSortedNumbers(nums) : nums;
}

function getTalalatok(a, b) {
  let n = 0;
  for (let i = 0; i < a.length; i++) {
    if (a.includes(b[i])) n++;
  }
  return n;
}

function getHaviLottoSzamok() {
  let a = [];
  for (let i = 0; i < 4; i++) {
    a.push(getOtoslottoSzamok());
  }
  return a;
}

function getHaviKihuzottSzamok() {
  let nums = [];
  let tempNums = getHaviLottoSzamok();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < tempNums[i].length; j++) {
      if (!nums.includes(tempNums[i][j])) nums.push(tempNums[i][j]);
    }
  }
  return nums;
}

function getHaviStatisztika() {
  let tempNums = getHaviLottoSzamok();
  let dict = {};
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < tempNums[i].length; j++) {
      let n = tempNums[i][j];
      if (dict[n]) dict[n]++;
      else dict[n] = 1;
    }
  }
  return dict;
}

// console.log(getOtoslottoSzamok());
// console.log(getSortedNumbers([5, 3, 42, 6]));
// console.log(getTalalatok([1, 2, 3], [1, 2, 3]));
// console.log(getHaviLottoSzamok());
// console.log(getHaviKihuzottSzamok());
console.log(getHaviStatisztika());
