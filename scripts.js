const calculator = {
	display: '0',
	operatorEvent: null,
	operator: '',
	calcOne: null,
	calcTwo: null,
};
setUpButtons();
updateDisplay();

function resetCalc() {
	calculator.display = '0';
	calculator.operatorEvent = null;
	calculator.operator = '';
	calculator.calcOne = null;
	calculator.calcTwo = null;
	updateDisplay(calculator.display);
}

function setUpButtons() {
	const numbers = document.querySelectorAll('.btn');
	for (let nums of numbers) {
		nums.addEventListener('click', clicked => {
			clickHandler(clicked);
		});
	}
}

function updateDisplay() {
	const displayScreen = document.querySelector('.display');
	displayScreen.innerHTML = calculator.display;
}

function clickHandler(clicked) {
	const { target } = clicked;
	if (target.classList.contains('num')) {
		isNumber(target.innerHTML);
		updateDisplay();
	}
	if (target.classList.contains('opp')) {
		isOperator(target.innerHTML);
	}
	if (target.classList.contains('equal')) {
		showResult();
	}
	if (target.classList.contains('clear')) {
		resetCalc();
	}
}

function isNumber(number) {
	const { display, operatorEvent } = calculator;
	if (operatorEvent) {
		calculator.display = number;
		calculator.operatorEvent = null;
	} else {
		calculator.display =
			display == '0' ? number : (calculator.display += number);
	}
}

function isOperator(opp) {
	const { operator, operatorEvent, display, calcOne } = calculator;
	const inputValue = parseFloat(display);
	if (calcOne === null) {
		calculator.calcOne = inputValue;
	}
	calculator.operatorEvent = true;
	calculator.operator = opp;
}

function showResult() {
	const { calcTwo, display, calcOne, operator } = calculator;
	calculator.calcTwo = calculator.display;
	const result = calculator.calcOne + operator + calculator.calcTwo;
	showCalculation(eval(result));
}

function showCalculation(result) {
	const { display } = calculator;
	calculator.display = result;
	const displayScreen = document.querySelector('.display');
	displayScreen.innerHTML = calculator.display;
}
