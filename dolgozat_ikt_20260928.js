// 1. feladat
function getGrade (s1, s2, s3) {
    let avg = (s1 + s2 + s3) / 3
    if (avg >= 90)
        return "A";
    else if (avg >= 80)
        return "B";
    else if (avg >= 70)
        return "C";
    else if (avg >= 60)
        return "D";
    else
        return "F";
}

// console.log(getGrade(58,59,60))


// 2. feladat
function findDifference(a, b) {
    let v1 = a[0] * a[1] * a[2];
    let v2 = b[0] * b[1] * b[2];
    return Math.abs(v1 - v2);
}

// console.log(findDifference([2, 2, 3], [5, 4, 1]))


// 3. feladat
function pattern1(n) {
    for (let i = 0; i < n; i++){
        console.log("  ".repeat(i) + "* ".repeat(n - i));
    }
}

// pattern1(5);


// 4. feladat
function pattern3(n) {
    for (let i = 1; i <= n; i++){
        console.log(" ".repeat(n - i) + (i != 0 ? "* ".repeat(i) : ""));
    }
}

// pattern3(5);