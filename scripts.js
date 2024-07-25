const calc = {
  firstNumber: "",
  secondNumber: "",
  symbol: "",

  add: function () {
    return +this.firstNumber + +this.secondNumber;
  },
  subtract: function () {
    return +this.firstNumber - +this.secondNumber;
  },
  multiply: function () {
    return +this.firstNumber * +this.secondNumber;
  },
  divide: function () {
    return +this.firstNumber / +this.secondNumber;
  },
  operate: function () {
    if (!this.symbol || !this.secondNumber) {
      return;
    }
    switch (this.symbol) {
      case "+":
        return this.add();
      case "-":
        return this.subtract();
      case "*":
        return this.multiply();
      case "/":
        return this.divide();
    }
  },

  clearAll: function () {
    this.firstNumber = "";
    this.secondNumber = "";
    this.symbol = "";
  },
};

const MAX_DISPLAY_LENGTH = 7;
let newFirst = true;

const formula = document.querySelectorAll(".formula");
const displayString = document.querySelector(".result");

function handleEvents(key) {
  if (
    (+key || key === "0") &&
    (displayString.textContent.length < MAX_DISPLAY_LENGTH ||
      displayString.textContent.includes("e"))
  ) {
    hideFormula();
    if (displayString.textContent === "0" || newFirst === true) {
      displayString.textContent = "";
    }
    if (!calc.symbol) {
      //If we don't yet have a symbol, treat new input as the first number
      if (newFirst) {
        calc.firstNumber = "";
        newFirst = false;
      }
      calc.firstNumber += key;
    } else {
      calc.secondNumber += key;
    }

    displayString.textContent += key;
  } else if (key === "=") {
    const result = calc.operate();
    if (result) {
      updateFormula();
      updateResult(result);
      newFirst = true;
    }
  } else if (key === ".") {
    hideFormula();
    if (!calc.symbol) {
      if (newFirst) {
        calc.firstNumber = displayString.textContent = "0";
        newFirst = false;
      }
      if (calc.firstNumber.indexOf(".") === -1) {
        calc.firstNumber += ".";
        displayString.textContent += ".";
      }
    } else if (calc.secondNumber.indexOf(".") === -1) {
      if (!calc.secondNumber) {
        calc.secondNumber = "0";
      }
      calc.secondNumber += ".";
      displayString.textContent += ".";
    }
  } else if (key === "CE") {
    hideFormula();
    calc.clearAll();
    displayString.textContent = "0";
    newFirst = true;
  } else if (key === "C") {
    hideFormula();
    clearCurrent();
    displayString.textContent = "0";
  } else if (
    key === "+/-" &&
    !(
      displayString.textContent === "0" ||
      displayString.textContent.includes("e")
    )
  ) {
    hideFormula();
    if (calc.secondNumber) {
      if (
        (calc.secondNumber > 0 &&
          displayString.textContent.length < MAX_DISPLAY_LENGTH) ||
        calc.secondNumber < 0
      ) {
        calc.secondNumber = String(calc.secondNumber * -1);
        displayString.textContent = calc.secondNumber;
      }
    } else if (
      (calc.firstNumber > 0 &&
        displayString.textContent.length < MAX_DISPLAY_LENGTH) ||
      calc.firstNumber < 0
    ) {
      calc.firstNumber = String(calc.firstNumber * -1);
      displayString.textContent = calc.firstNumber;
    }
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    hideFormula();
    newFirst = false;
    calc.symbol = key;
    displayString.textContent = "0";
  }
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleEvents(button.textContent);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key === "Escape" ? "CE" : e.key === "c" ? "C" : e.key;
  for (button of buttons) {
    if (button.textContent === key) {
      handleEvents(key);
      return;
    }
  }
});

function hideFormula() {
  formula.forEach((el) => el.classList.add("invisible"));
}

function updateFormula() {
  formula[0].textContent = calc.firstNumber;
  formula[1].textContent = `${calc.symbol} ${calc.secondNumber}`;
  formula.forEach((el) => el.classList.remove("invisible"));
}

function updateResult(result) {
  let resString = String(result);
  if (resString.length > MAX_DISPLAY_LENGTH) {
    resString = result.toExponential(1);
  }

  calc.clearAll();
  calc.firstNumber = resString;
  displayString.textContent = resString;
}

function clearCurrent() {
  if (calc.secondNumber) {
    calc.secondNumber = "";
  } else {
    calc.firstNumber = "";
  }
}
