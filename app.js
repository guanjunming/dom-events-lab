const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const displayEl = document.querySelector(".display");

const MAX_DIGITS = 16;

let num1 = null;
let num2 = null;
let operator = null;

const calculate = (a, b, operation) => {
  //a = Number(a);
  //b = Number(b);

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

const handleNumberClick = (e) => {
  if (displayEl.textContent.length >= MAX_DIGITS) {
    return;
  }

  if (displayEl.textContent === "0") {
    displayEl.textContent = "";
  }

  displayEl.textContent += e.target.textContent;
};

const handleOperatorClick = (e) => {
  const op = e.target.innerText;

  if (op === "C") {
    clearDisplay();
  } else {
  }
};

const handleEqualsClick = () => {
  if (num1 === null || num2 === null || operator === null) {
    return;
  }

  const result = calculate(num1, num2, operator);
  displayEl.textContent = result;

  num1 = result;
  num2 = null;
  operator = null;
};

numberBtns.forEach((button) => button.addEventListener("click", handleNumberClick));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorClick));
equalsBtn.addEventListener("click", handleEqualsClick);

clearDisplay();
