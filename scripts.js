function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

function operate(a, b, symbol){
    switch(symbol){
        case '+': return add(a, b); break;
        case '-': return subtract(a, b); break;
        case '*': return multiply(a, b); break;
        case '/': return divide(a, b); break;
    }
}

let calc = {
    displayString: '',
    firstNumber: 0,
    secondNumber: 0,
    symbol: '',
    result: 0,

    add: add(),
    subtract: subtract(),
    multiply: multiply(),
    divide: divide(),
    operate: operate(),
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", button, () => {
        if(+button.textContent){
            if(!calc.symbol){
                firstNumber = +button.textContent;
            } else {
                secondNumber = +button.textContent;
            }
        }
        else if(button.textContent === '='){
            calc.operate();
        }
        else {
            calc.symbol = text.textContent;
        }
    }) 
});