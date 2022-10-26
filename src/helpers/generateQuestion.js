// ROOT FUNCTIONS
// Generate an equation and pass it as a question
const limit = 10;
const operators = [
    {
        operatorSign: "+",
        operatorFunc: (x1, x2) => x1 + x2,
    },
    {
        operatorSign: "-",
        operatorFunc: (x1, x2) => x1 - x2,
    },
    {
        operatorSign: "*",
        operatorFunc: (x1, x2) => x1 * x2,
    },
    {
        operatorSign: "/",
        operatorFunc: (x1, x2) => x1 / x2,
    }
];

function randomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

function randomItem(array) {
    return array[randomNumber(array.length)];
}

export default function generateQuestion() {
    let num1 = randomNumber(limit);
    let num2 = randomNumber(limit);
    let operatorObject = randomItem(operators);
    let result = calc(num1, num2, operatorObject);
    return ({num1, num2, operatorObject, result});
}

function calc(num1, num2, operatorObject) {
    return operatorObject.operatorFunc(num1, num2);
}