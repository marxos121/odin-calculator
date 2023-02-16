const calc = {
    displayString: '',
    firstNumber: '',
    secondNumber: '',
    symbol: '',
    result: 0,
    newFirst: true,

    add: function() { this.result = +this.firstNumber + +this.secondNumber; },
    subtract: function() { this.result = +this.firstNumber - +this.secondNumber; },
    multiply: function() { this.result = +this.firstNumber * +this.secondNumber; },
    divide: function() { this.result = +this.firstNumber / +this.secondNumber; },
    operate: function() {
        if(!this.symbol || !this.secondNumber) { return; }
        switch(this.symbol){
            case '+': this.add(); break;
            case '-': this.subtract(); break;
            case '*': this.multiply(); break;
            case '/': this.divide(); break;
        }
        this.firstNumber = this.result;
        this.secondNumber = '';
        this.symbol = '';
        
        this.displayString = this.result;
        this.result = 0;
        this.newFirst = true;
        this.updateDisplay();
    },

    updateDisplay: function() {
        document.querySelector("#result").textContent = this.displayString;
    },
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(calc.displayString == '0' || calc.newFirst === true) { calc.displayString = ''; }
        if(+button.textContent || button.textContent === '0'){
            if(!calc.symbol){                           //If we don't yet have a symbol, treat new input as the first number
                if(calc.newFirst){
                    calc.firstNumber = '';
                    calc.newFirst = false;
                }
                calc.firstNumber += button.textContent;
            } else {
                calc.secondNumber += button.textContent;
            }

            calc.displayString += button.textContent;
        }
        else if(button.textContent == '='){
            calc.operate();
        }
        else if(button.textContent == '.'){
            if(!calc.symbol){
                if(calc.newFirst){
                    calc.firstNumber = '';
                    calc.newFirst = false;
                }
                if(calc.firstNumber % 1 == 0){
                    calc.firstNumber += '.';
                    }
                } else if (calc.secondNumber % 1 == 0){
                    calc.secondNumber += '.';
            }
            calc.displayString += button.textContent;
        }
        else {
            calc.symbol = button.textContent;
            calc.displayString = '0';
        }

        calc.updateDisplay();
    }) 
});