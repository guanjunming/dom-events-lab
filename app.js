const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const displayEl = document.querySelector(".display");

const MAX_DIGITS = 16;

let num1 = null;
let num2 = null;
let operator = null;

let clearDisplayContent = false;

const calculate = (a, b, operation) => {
  //console.log(`a:${a}, b:${0}, op:${operation}`);
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
  }
};

const clearDisplay = () => {
  num1 = null;
  num2 = null;
  operator = null;
  displayEl.textContent = "0";
};

const updateDisplay = (value) => {
  if (displayEl.textContent === "0" || clearDisplayContent) {
    displayEl.textContent = "";
    clearDisplayContent = false;
  }

  displayEl.textContent += value;
};

const handleNumberClick = (e) => {
  if (displayEl.textContent.length >= MAX_DIGITS) {
    return;
  }

  updateDisplay(e.target.textContent);
};

const handleOperatorClick = (e) => {
  const op = e.target.innerText;

  if (op === "C") {
    clearDisplay();
  } else {
    if (num1 === null) {
      num1 = Number(displayEl.textContent);
    } else {
      num2 = Number(displayEl.textContent);
      const result = calculate(num1, num2, operator);
      displayEl.textContent = result;
      num1 = result;
    }

    operator = op;
    clearDisplayContent = true;
  }
};

const handleEqualsClick = () => {
  if (num1 === null || operator === null) {
    return;
  }

  num2 = Number(displayEl.textContent);
  const result = calculate(num1, num2, operator);
  displayEl.textContent = result;
  num1 = result;

  clearDisplayContent = true;
};

numberBtns.forEach((button) => button.addEventListener("click", handleNumberClick));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorClick));
equalsBtn.addEventListener("click", handleEqualsClick);

clearDisplay();
