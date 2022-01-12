const fib = function(number) {
    if(number < 0) {
        number *= -1;
    }

    if(number <= 2) {
        return 1;
    }
    else {
        return fib(number - 1) + fib(number - 2);
    }
};

console.log("2: Fibanocci of", 42 , "is", fib(42));