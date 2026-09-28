// 1. feladat
function divisors(integer) {
    let array = [];
    for (let i = 2; i <= integer/2; i++){
        if (integer % i == 0)
            array.push(i);
    }
    if (array.length == 0)
        return `${integer} is prime`;
    return array;
}

// console.log(divisors(13))


// 2. feladat
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++){
        result *= i;
    }
    return result;
}

// console.log(factorial(5))

// 3. feladat
function fizzbuzz(n) {
    if (n % 3 == 0 && n % 5 == 0)
        return "FizzBuzz";
    else if (n % 3 == 0)
        return "Fizz";
    else if (n % 5 == 0)
        return "Buzz";
    else
        return n;
}

// console.log(fizzbuzz(8))


// 4. feladat
function pattern(n) {
    for (let i = 0; i < n; i++){
        console.log(" ".repeat(i) + (i == 0 ? "* ".repeat(n - i) : "* " + "  ".repeat(Math.max((n - i)-2, 0))) + (i != 0 && i != n - 1 ? "*" : ""))
    }
}

// pattern(5);