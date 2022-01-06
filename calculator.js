let operation;
let result;
let displayValue = "";
let k = 0;
let arr = [];
let checkpoint = "";

const display = document.querySelector(".display");
const content = document.createElement('div');
content.classList.add('content');

function add(a,b) {
    return Math.round((a + b) * 100)/100;
}

function subtract(a,b) {
    return Math.round((a - b) * 100)/100
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function clearContent() {
    displayValue = "";
    display.textContent = "";
    result = "";
    arr = [];
    k = 0;
}

// clearing all values with AC button
const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', () => {
    clearContent();
});

// populating the display
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (displayValue.length < 12) {    
            displayValue = displayValue + button.id;
            content.textContent = displayValue;
            display.appendChild(content);
        }
        if (content.textContent.includes(".")) {
            document.querySelector(".dot").disabled = true;
        }
        if (!content.textContent.includes(".")) {
            document.querySelector(".dot").disabled = false;
        }  
    });
});

// backspacing on display
const del = document.getElementById("delete");
del.addEventListener('click', () => {
    content.textContent = displayValue.slice(0, -1);
    displayValue = content.textContent;
    if (content.textContent === "" ) {
        clearContent();
    }
});

// removing previous operand from display when an operator is clicked
// establishing which operation is going to happen
// storing operands and operators in an array
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (checkpoint === "go") {
            displayValue = "";
            arr[k] = Number(display.textContent);
            arr[k + 1] = button.id;
            k += 2;
        }
    });
});

// checkpoint to make sure clicking operator >1 times doesn't affect the result
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener('click', () => {
        if (button.className == "operator") {
            checkpoint = "stop";
        }
        else if (button.className === "number") {
            checkpoint = "go";
        }
    });
});

// going through the array's values and displaying the result
const equalButton = document.querySelector(".equal");
equalButton.addEventListener('click', () => {
    for (let i = 2; i < arr.length; i++) {
        if (arr[i-1] === "add") {
            operation = add;
        } else if (arr[i-1] === "subtract") {
            operation = subtract;
        } else if (arr[i-1] === "multiply") {
            operation = multiply;
        } else if (arr[i-1] === "divide") {
            operation = divide;
        }

        if (i % 2 === 0 && arr.length > 4) {
            result = operate(operation, arr[i-2], arr[i]);  
            arr.splice(0, 3, result);
            i -= 2;
        }

        if (i % 2 === 0 && arr.length === 4) {
            result = operate(operation, arr[i-2], arr[i]);
        }

        if (operation === divide && arr[i] === 0) {
            alert("Are you okay? Maybe try something else...");
            clearContent();
        }
    }
    if (result.toString().length > 12) {
        let exponentialResult = result.toExponential();
        if (exponentialResult.toString().length > 12) {
            result = exponentialResult.toString().slice(0, 7) + exponentialResult.toString().slice(-4);
        }
        else {
            result = exponentialResult;
        }
        content.textContent = result;
        display.appendChild(content);
    } else {
        content.textContent = result;
        display.appendChild(content);
    } 

    if (content.textContent === "") {
        clearContent();
    } 

    if (content) {
        displayValue = "";
    }

    k = 0;
    arr = [];

});
