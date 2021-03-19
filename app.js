class Calculator {
  constructor(prevOperandElem, currentOperandElem) {
    this.prevOperandElem = prevOperandElem;
    this.currentOperandElem = currentOperandElem;
    this.clear();
  }

  clear() {
    //   Make current Operand empty string
    this.currentOperand = "";
    // Make prev Operand empty string
    this.prevOperand = "";
    //  Operation is undefined
    this.operation = undefined;
    // Call the update display to make it work
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
    this.updateDisplay()
  }

  appendNumber(number) {
    //   Check that only one . can go into the calculator
    if (number === "." && this.currentOperand.includes(".")) return;
    // Rewrite currentOperand to itself and add the parameter ( Turn to a string)
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    // Need to check if currentOperand is not empty only then let it work
    if(this.currentOperand === "") return
    // Need to check if the prev Operand has anything iside of it as well, if it has do the operation for it with the current
    if(this.prevOperand !== "") {
        calculator.compute();
    }

    // Define the operatoin
    this.operation = operation;
    // Make prev operand current operand
    this.prevOperand = this.currentOperand;
    // Clear current operand
    this.currentOperand = "";
  }

  compute() {
    //   Will store the operation heres
    let computation
    // Parse the string and put into the prev
    const prev = parseFloat(this.prevOperand)
    // Parse the string and put into the current 
    const current = parseFloat(this.currentOperand)
    // Dont let it work if the prev is empty or current is empty
    if(isNaN(prev) || isNaN(current)) return

    // Compute function
    switch(this.operation) {
        case "+": 
        computation = prev + current
        break
        case "÷":
        computation = prev / current
        break
        case "-":
        computation = prev - current
        break
        case "*":
        computation = prev * current
        break
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.prevOperand = ""
  }

  updateDisplay() {
    //   Put the currentOperand innerText to currentOperand
    this.currentOperandElem.innerText = this.currentOperand
    //  Put the prevOperand innerText to prevOperand
    this.prevOperandElem.innerText = this.prevOperand
  }
}

// First thing first get all the elements from the HTML
const prevOperandElem = document.querySelector("[data-prev-operand]");
const currentOperandElem = document.querySelector("[data-current-operand]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equal]");

const calculator = new Calculator(prevOperandElem, currentOperandElem);

// Add Numbers 0 - 9 including .
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Pass the operation
operationButtons.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
});

// Equals
equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

// Delete 
deleteButton.addEventListener("click", () => {
    calculator.delete()
})

// Clear Function
clearButton.addEventListener("click", () => {
  calculator.clear();
});
