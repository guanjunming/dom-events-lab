const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const displayEl = document.querySelector(".display");

const MAX_INPUT_DIGITS = 16;
const MAX_DECIMAL_DIGITS = 15;
const MAX_EXPONENTIAL_DECIMALS = 12;

let num1 = null;
let operator = null;
let waitingForNum2 = false;
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
  waitingForNum2 = false;
  hasError = false;
};

// https://stackoverflow.com/questions/3612744/remove-insignificant-trailing-zeros-from-a-number
function formatExponential(num) {
  return num.toExponential(MAX_EXPONENTIAL_DECIMALS).replace(/\.?0+e/, "e"); // Remove trailing zeros
}

function formatResult(result) {
  if (isNaN(result)) {
    return result;
  }

  const resultString = result.toString();

  if (resultString.includes("e")) {
    return formatExponential(result);
  } else if (resultString.includes(".")) {
    // if decimal places exceed max digits, format to exponential
    const decimals = resultString.split(".")[1];
    return decimals.length > MAX_DECIMAL_DIGITS ? formatExponential(result) : result;
  } else {
    return result;
  }
}

const handleNumberClick = (e) => {
  if (hasError) {
    clearDisplay();
  }

  const digit = e.target.textContent;

  if (waitingForNum2) {
    displayEl.textContent = digit;
    waitingForNum2 = false;
  } else if (displayEl.textContent.length < MAX_INPUT_DIGITS) {
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
    } else if (!waitingForNum2) {
      const num2 = Number(displayEl.textContent);
      const result = calculate(num1, num2, operator);
      displayEl.textContent = formatResult(result);
      num1 = result;
    }

    operator = op;
    waitingForNum2 = true;
  }
};

const handleEqualsClick = () => {
  if (hasError || operator === null || waitingForNum2) {
    return;
  }

  const num2 = Number(displayEl.textContent);
  const result = calculate(num1, num2, operator);
  displayEl.textContent = formatResult(result);

  num1 = null;
  operator = null;
  waitingForNum2 = true; // in order to reset display
};

numberBtns.forEach((button) => button.addEventListener("click", handleNumberClick));
operatorBtns.forEach((button) => button.addEventListener("click", handleOperatorClick));
equalsBtn.addEventListener("click", handleEqualsClick);
