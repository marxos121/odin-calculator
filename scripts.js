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

        let temp = parseFloat(this.result.toFixed(4));
        this.clearAll();
        this.firstNumber = temp;
        this.displayString = temp;
        this.updateDisplay();
    },

    updateDisplay: function() {
        document.querySelector(".result").textContent = this.displayString;
    },

    clearAll: function() {     
        this.firstNumber = '';   
        this.secondNumber = '';
        this.symbol = '';
        this.result = 0;
        this.newFirst = true;
        this.displayString = '0';
    },

    clearCurrent: function() {
        if(this.secondNumber) {
            this.secondNumber = '';
        } else {
            this.firstNumber = '';
        }
        this.displayString = '0';
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
                if(calc.firstNumber.indexOf('.') === -1){
                    calc.firstNumber += '.';
                    calc.displayString += button.textContent;
                    }
                } else if (calc.secondNumber.indexOf('.') === -1){
                    calc.secondNumber += '.';
                    calc.displayString += button.textContent;
            }
        }
        else if(button.textContent == 'CE'){
            calc.clearAll();
        }
        else if(button.textContent == 'Clear'){
            calc.clearCurrent();
        }
        else if(button.textContent == '+/-') {
            if(calc.secondNumber) { 
                calc.secondNumber = parseInt(calc.secondNumber) * (-1);
                if(calc.secondNumber < 0) {
                    calc.displayString = '-' + calc.displayString;
                } else if(calc.displayString[0] == '-') {
                    calc.displayString = calc.displayString.substring(1);
                }
            } else {
                calc.firstNumber = parseInt(calc.firstNumber) * (-1)
                if(calc.firstNumber < 0) {
                    calc.displayString = '-' + calc.displayString;
                } else if(calc.displayString[0] == '-') {
                    calc.displayString = calc.displayString.substring(1);
                }
            }
        }
        else {
            calc.newFirst = false;
            calc.symbol = button.textContent;
            calc.displayString = '0';
        }

        calc.updateDisplay();
    }) 
});