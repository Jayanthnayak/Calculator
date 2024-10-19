const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

const buttons = document.querySelectorAll('.btn');
const calculator = document.querySelector('.calculator');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            setOperator(value);
        } else {
            appendNumber(value);
        }

        // Add active class for background glow
        calculator.classList.add('active');
        setTimeout(() => {
            calculator.classList.remove('active');
        }, 300);
    });
});

function appendNumber(value) {
    if (currentInput === '0' && value === '0') return; // Avoid leading zeroes
    if (currentInput.includes('.') && value === '.') return; // Avoid multiple decimals
    currentInput += value;
    updateDisplay();
}

function setOperator(value) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput !== '') {
        if (previousInput !== '') calculate();
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }
    updateDisplay();
}

function calculate() {
    if (operator === '' || previousInput === '' || currentInput === '') return;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    display.innerText = previousInput + operator + currentInput;
    if (display.innerText === '') display.innerText = '0';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}
