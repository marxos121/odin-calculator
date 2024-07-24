const calc = {
  displayString: "0",
  firstNumber: "",
  secondNumber: "",
  symbol: "",
  result: 0,
  newFirst: true,
  maxDisplayLength: 7,

  add: function () {
    this.result = +this.firstNumber + +this.secondNumber;
  },
  subtract: function () {
    this.result = +this.firstNumber - +this.secondNumber;
  },
  multiply: function () {
    this.result = +this.firstNumber * +this.secondNumber;
  },
  divide: function () {
    this.result = +this.firstNumber / +this.secondNumber;
  },
  operate: function () {
    if (!this.symbol || !this.secondNumber) {
      return;
    }
    switch (this.symbol) {
      case "+":
        this.add();
        break;
      case "-":
        this.subtract();
        break;
      case "*":
        this.multiply();
        break;
      case "/":
        this.divide();
        break;
    }

    let temp = parseFloat(this.result.toFixed(4));
    let formula = document.querySelector(".formula");
    formula.textContent = `${this.firstNumber} ${this.symbol} ${this.secondNumber} =`;
    formula.classList.remove("invisible");
    this.clearAll();
    if (temp === Infinity) {
      this.firstNumber = 0;
      this.displayString = "ERROR";
    } else {
      this.firstNumber = temp;
      this.displayString = temp;
    }
    this.updateDisplay();
  },

  updateDisplay: function () {
    this.displayString = String(this.displayString);
    if (this.displayString.length > this.maxDisplayLength) {
      this.displayString = this.displayString.substring(
        0,
        this.maxDisplayLength
      );
    }
    document.querySelector(".result").textContent = this.displayString;
  },

  clearAll: function () {
    this.firstNumber = "";
    this.secondNumber = "";
    this.symbol = "";
    this.result = 0;
    this.newFirst = true;
    this.displayString = "0";
  },

  clearCurrent: function () {
    if (this.secondNumber) {
      this.secondNumber = "";
    } else {
      this.firstNumber = "";
    }
    this.displayString = "0";
  },
};

function handleEvents(key) {
  document.querySelector(".formula").classList.add("invisible");

  if (
    (+key || key === "0") &&
    calc.displayString.length < calc.maxDisplayLength
  ) {
    if (calc.displayString == "0" || calc.newFirst === true) {
      calc.displayString = "";
    }
    if (!calc.symbol) {
      //If we don't yet have a symbol, treat new input as the first number
      if (calc.newFirst) {
        calc.firstNumber = "";
        calc.newFirst = false;
      }
      calc.firstNumber += key;
    } else {
      calc.secondNumber += key;
    }

    calc.displayString += key;
  } else if (key == "=") {
    calc.operate();
  } else if (key == ".") {
    if (!calc.symbol) {
      if (calc.newFirst) {
        calc.firstNumber = "";
        calc.newFirst = false;
      }
      if (calc.firstNumber.indexOf(".") === -1) {
        calc.firstNumber += ".";
        calc.displayString += key;
      }
    } else if (calc.secondNumber.indexOf(".") === -1) {
      calc.secondNumber += ".";
      calc.displayString += key;
    }
  } else if (key == "CE") {
    calc.clearAll();
  } else if (key == "C") {
    calc.clearCurrent();
  } else if (key == "+/-") {
    if (calc.displayString == "0") {
      return;
    }
    if (calc.secondNumber) {
      calc.secondNumber = parseInt(calc.secondNumber) * -1;
      if (
        calc.secondNumber < 0 &&
        calc.displayString.length < calc.maxDisplayLength
      ) {
        calc.displayString = "-" + calc.displayString;
      } else if (calc.displayString[0] == "-") {
        calc.displayString = calc.displayString.substring(1);
      }
    } else {
      calc.firstNumber = parseInt(calc.firstNumber) * -1;
      if (
        calc.firstNumber < 0 &&
        calc.displayString.length < calc.maxDisplayLength
      ) {
        calc.displayString = "-" + calc.displayString;
      } else if (calc.displayString[0] == "-") {
        calc.displayString = calc.displayString.substring(1);
      }
    }
  } else if (key == "+" || key == "-" || key == "*" || key == "/") {
    calc.newFirst = false;
    calc.symbol = key;
    calc.displayString = "0";
  }

  calc.updateDisplay();
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleEvents(button.textContent);
  });
});

document.addEventListener("keydown", (e) => {
  let key = e.key == "Escape" ? "CE" : e.key == "c" ? "C" : e.key;
  for (button of buttons) {
    if (button.textContent == key) {
      handleEvents(key);
      return;
    }
  }
});
