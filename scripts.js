const calc = {
    displayString: '',
    firstNumber: '',
    secondNumber: '',
    symbol: '',
    result: 0,
    display: document.querySelector("#result"),

    add: function() { result = +this.firstNumber + +this.secondNumber; },
    subtract: function() { result = +this.firstNumber - +this.secondNumber; },
    multiply: function() { result = +this.firstNumber * +this.secondNumber; },
    divide: function() { result = +this.firstNumber / +this.secondNumber; },
    operate: function() {
        if(!this.symbol || !this.secondNumber) { return; }
        switch(this.symbol){
            case '+': this.add(); break;
            case '-': this.subtract(); break;
            case '*': this.multiply(); break;
            case '/': this.divide(); break;
        }
        this.displayString = result;
        this.updateDisplay();
    },
    updateDisplay: function() {
        console.log(this.display);
        document.querySelector("#result").textContent = this.displayString;
        console.log(this);
    },
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(+button.textContent){
            if(!calc.symbol){                           //If we don't yet have a symbol, treat new input as the first number
                calc.firstNumber += button.textContent;
            } else {
                calc.secondNumber += button.textContent;
            }
            
            if(calc.displayString == '0') { calc.displayString = ''; }
            calc.displayString += button.textContent;
        }
        else if(button.textContent == '='){
            calc.operate();
        }
        else {
            calc.symbol = button.textContent;
            calc.displayString = '0';
        }

        calc.updateDisplay();
    }) 
});