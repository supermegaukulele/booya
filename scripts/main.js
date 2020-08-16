// MDB Lightbox Init
$(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});

$(function () {
    var selectedClass = "";
    $(".filter").click(function () {
        selectedClass = $(this).attr("data-rel");
        $("#gallery").fadeTo(100, 0.1);
        $("#gallery div").not("." + selectedClass).fadeOut().removeClass('animation');
        setTimeout(function () {
            $("." + selectedClass).fadeIn().addClass('animation');
            $("#gallery").fadeTo(300, 1);
        }, 300);
    });
});


const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false, // Check if both first operand and operator is inputted
    operator: null,
};

function inputDigit(digit) {
    const {
        displayValue,
        waitingForSecondOperand
    } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = (displayValue === '0') || (displayValue === 'e') || (displayValue === 'π') ? digit : displayValue + digit;
    }
}

function inputmathconst(mconst) {
    const {
        displayValue,
        waitingForSecondOperand
    } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = mconst;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = mconst;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const {
        firstOperand,
        displayValue,
        operator
    } = calculator
    // console.log(displayValue);
    let inputValue;

    if (displayValue === 'π') {
        inputValue = Math.PI;
    } else if (displayValue === 'e') {
        inputValue = Math.exp(1);
    } else {
        inputValue = parseFloat(displayValue);
    }

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    console.log(inputValue);

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    45
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    } else if (operator === '%') {
        return firstOperand % secondOperand;
    } else if (operator === '**') {
        return Math.pow(firstOperand, secondOperand);
    }

    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    const display = document.querySelector('.cal-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.cal-buttons');
keys.addEventListener('click', event => {
    const {
        target
    } = event;
    const {
        value
    } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '**':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        case 'e':
        case 'π':
            inputmathconst(value);
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});