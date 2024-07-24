const calc = {
  displayString: "0",
  firstNumber: "0",
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

    const formula = document.querySelectorAll(".formula");
    formula[0].textContent =
      String(this.firstNumber).length > this.maxDisplayLength
        ? this.firstNumber.toExponential(1)
        : this.firstNumber;
    formula[1].textContent = `${this.symbol} ${this.secondNumber}`;
    formula.forEach((el) => el.classList.remove("invisible"));

    let resString = String(this.result);
    if (resString.length > this.maxDisplayLength) {
      resString = Number.parseFloat(this.result).toExponential(1);
    }

    this.clearAll();
    this.firstNumber = resString;
    this.displayString = resString;
    this.updateDisplay();
  },

  updateDisplay: function () {
    this.displayString = String(this.displayString);
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
  if (
    (+key || key === "0") &&
    (calc.displayString.length < calc.maxDisplayLength ||
      calc.displayString.includes("e"))
  ) {
    const formula = document.querySelectorAll(".formula");
    formula.forEach((el) => el.classList.add("invisible"));
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
        calc.firstNumber = calc.displayString = "0";
        calc.newFirst = false;
      }
      if (calc.firstNumber.indexOf(".") === -1) {
        calc.firstNumber += ".";
        calc.displayString += ".";
      }
    } else if (calc.secondNumber.indexOf(".") === -1) {
      if (!calc.secondNumber) {
        calc.secondNumber = "0";
      }
      calc.secondNumber += ".";
      calc.displayString += ".";
    }
  } else if (key == "CE") {
    const formula = document.querySelectorAll(".formula");
    formula.forEach((el) => el.classList.add("invisible"));
    calc.clearAll();
  } else if (key == "C") {
    const formula = document.querySelectorAll(".formula");
    formula.forEach((el) => el.classList.add("invisible"));
    calc.clearCurrent();
  } else if (key == "+/-") {
    if (calc.displayString == "0" || calc.displayString.includes("e")) {
      return;
    }
    const formula = document.querySelectorAll(".formula");
    formula.forEach((el) => el.classList.add("invisible"));
    if (calc.secondNumber) {
      calc.secondNumber = parseFloat(calc.secondNumber) * -1;
      if (
        calc.secondNumber < 0 &&
        calc.displayString.length < calc.maxDisplayLength
      ) {
        calc.displayString = "-" + calc.displayString;
      } else if (calc.displayString[0] == "-") {
        calc.displayString = calc.displayString.substring(1);
      }
    } else {
      calc.firstNumber = parseFloat(calc.firstNumber) * -1;
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
    const formula = document.querySelectorAll(".formula");
    formula.forEach((el) => el.classList.add("invisible"));
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
  const key = e.key == "Escape" ? "CE" : e.key == "c" ? "C" : e.key;
  for (button of buttons) {
    if (button.textContent == key) {
      handleEvents(key);
      return;
    }
  }
});
