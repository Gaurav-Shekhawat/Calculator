let displayValue = 0;
let displayValueAssigned = false;
let bufferValue = null;
let lastOperator = null;
let equalpressed = false;

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return Math.floor((a * 100) / b) / 100;
}

function updateUpperDisplay() {
	if (equalpressed === true) {
		upperDisplay.innerText += ` ${displayValue} =`;
	} else upperDisplay.innerText = `${bufferValue} ${lastOperator}`;
}

function operate(a, operator, b) {
	switch (operator) {
		case "+":
			return add(a, b);
			break;
		case "-":
			return subtract(a, b);
			break;
		case "*":
			return multiply(a, b);
			break;
		case "/":
			return divide(a, b);
			break;
	}
}

function updateDisplayValue() {
	if (displayValue === "") display.innerText = 0;
	else display.innerText = displayValue;
}

function addToDisplay(e) {
	displayValueAssigned = true;
	if (!isNaN(Number(this.innerText))) {
		if (displayValue === 0) {
			displayValue = "";
		}
		displayValue = displayValue + this.innerText;
	}
	updateDisplayValue();
}

function operatorPressed(e) {
	if (lastOperator != null && this.innerText != "=") {
		bufferValue = operate(
			Number(bufferValue),
			lastOperator,
			Number(displayValue)
		);
		displayValue = "";
		updateDisplayValue();
		lastOperator = this.innerText;
		updateUpperDisplay();
		return;
	}

	if (lastOperator != null && displayValue === "") {
		lastOperator = this.innerText;
		updateUpperDisplay();
	}

	if (displayValueAssigned === false) {
		return;
	}

	if (this.innerText != "=") {
		bufferValue = displayValue;
		displayValue = "";
		lastOperator = this.innerText;
		updateDisplayValue();
		updateUpperDisplay();
	} else {
		equalpressed = true;
		if (lastOperator === null) {
			return;
		}
		updateUpperDisplay();
		displayValue = operate(
			Number(bufferValue),
			lastOperator,
			Number(displayValue)
		);
		updateDisplayValue();
		lastOperator = null;
		bufferValue = null;
		equalpressed = false;
	}
}

function clearingEverything() {
	displayValue = 0;
	bufferValue = null;
	lastOperator = null;
	upperDisplay.innerText = "";
	updateDisplayValue();
}

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
	number.addEventListener("click", addToDisplay);
});

const display = document.querySelector(".display.down");
display.innerText = displayValue;

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
	operator.addEventListener("click", operatorPressed);
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearingEverything);

const upperDisplay = document.querySelector(".display.up");
