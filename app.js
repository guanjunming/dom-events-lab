const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const displayEl = document.querySelector(".display");

const MAX_DIGITS = 16;

let num1 = null;
let operator = null;
let waitForNum2 = false;

function printStatus() {
  console.log("num1: ", num1, "operator", operator, "waitForNum2", waitForNum2);
}

const calculate = (a, b, operation) => {
  console.log(`a:${a}, b:${b}, op:${operation}`);
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
      result = b !== 0 ? a / b : "Error";
      break;
  }
  console.log(result);
  return result;
};

const clearDisplay = () => {
  num1 = null;
  operator = null;
  displayEl.textContent = "0";
  waitForNum2 = false;
};

const handleNumberClick = (e) => {
  if (displayEl.textContent.length >= MAX_DIGITS) {
    return;
  }

  const digit = e.target.textContent;

  if (waitForNum2) {
    displayEl.textContent = digit;
    waitForNum2 = false;
  } else {
    displayEl.textContent = displayEl.textContent === "0" ? digit : displayEl.textContent + digit;
  }

  printStatus();
};

const handleOperatorClick = (e) => {
  const op = e.target.innerText;

  if (op === "C") {
    clearDisplay();
  } else {
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

    printStatus();
  }
};

const handleEqualsClick = () => {
  if (operator === null || waitForNum2) {
    return;
  }

  const num2 = Number(displayEl.textContent);
  const result = calculate(num1, num2, operator);
  displayEl.textContent = result;

  num1 = null;
  operator = null;
  waitForNum2 = false;

  printStatus();
};

numberBtns.forEach((button) => button.addEventListener("click", handleNumberClick));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorClick));
equalsBtn.addEventListener("click", handleEqualsClick);
