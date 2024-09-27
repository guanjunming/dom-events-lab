const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const displayEl = document.querySelector(".display");

const MAX_DIGITS = 15;

let num1 = null;
let operator = null;
let waitForNum2 = false;
let hasError = false;

const calculate = (a, b, operation) => {
  let result;
  switch (operation) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        hasError = true;
        result = "Divide by Zero Error";
      } else {
        result = a / b;
      }
      break;
  }
  return result;
};

const clearDisplay = () => {
  num1 = null;
  operator = null;
  displayEl.textContent = "0";
  waitForNum2 = false;
  hasError = false;
};

const handleNumberClick = (e) => {
  if (hasError) {
    return;
  }

  const digit = e.target.textContent;

  if (waitForNum2) {
    displayEl.textContent = digit;
    waitForNum2 = false;
  } else if (displayEl.textContent.length < MAX_DIGITS) {
    displayEl.textContent = displayEl.textContent === "0" ? digit : displayEl.textContent + digit;
  }
};

const handleOperatorClick = (e) => {
  const op = e.target.textContent;

  if (op === "C") {
    clearDisplay();
  } else if (!hasError) {
    if (num1 === null) {
      num1 = Number(displayEl.textContent);
    } else if (!waitForNum2) {
      const num2 = Number(displayEl.textContent);
      const result = calculate(num1, num2, operator);
      displayEl.textContent = result;
      num1 = result;
    }

    operator = op;
    waitForNum2 = true;
  }
};

const handleEqualsClick = () => {
  if (hasError || operator === null || waitForNum2) {
    return;
  }

  const num2 = Number(displayEl.textContent);
  const result = calculate(num1, num2, operator);
  displayEl.textContent = result;

  num1 = null;
  operator = null;
  waitForNum2 = true; // in order to reset display
};

numberBtns.forEach((button) => button.addEventListener("click", handleNumberClick));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorClick));
equalsBtn.addEventListener("click", handleEqualsClick);
