//================================================================================================
// Name: Dawson Sanders
// Description: This is a simple calculator program
//================================================================================================


//================================================================================================
// Calculator Class
//================================================================================================
class Calculator {
    constructor(prevValueTextElement, currValueTextElement) {
        this.prevValueTextElement = prevValueTextElement;
        this.currValueTextElement = currValueTextElement;
        this.clear() // Calls the clear method everytime a new calculator is created
    }

    // Method that clears screen
    clear() {
        this.currValue = '';
        this.prevValue = '';
        this.operation = undefined;
    }

    // Method that deletes numbers from screen
    delete() {
        this.currValue = this.currValue.toString().slice(0, -1);
    }

    // Method that puts a number on the screen 
    appendNumber(number) {
        if (number === '.' && this.currValue.includes('.')) 
            return;
        this.currValue = this.currValue.toString() + number.toString(); //toString() method is used so values are not literally added together
    }

    // Method that chooses the operation 
    selectOperation(operation) {
        if (this.currValue === '')
            return;
        if (this.prevValue != '')
            this.calculate();
        this.operation = operation;
        this.prevValue = this.currValue;
        this.currValue = '';
    }

    // Method that calculates the everything
    calculate() {
        let result;
        const prev = parseFloat(this.prevValue); // parseFloat() method is used to convert a string to a number
        const curr = parseFloat(this.currValue); // parseFloat() method is used to convert a string to a number
        
        if (isNaN(prev) || isNaN(curr))
            return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case 'x':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currValue = result;
        this.operation = undefined;
        this.prevValue = '';
    }

    getScreenNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerScreen;
        if (isNaN(integerDigits))
            integerScreen = '';
        else 
            integerScreen = integerDigits.toLocaleString('en', {maximumFractionDigit: 0});

        if (decimalDigits != null)
            return `${integerScreen}.${decimalDigits}`
        else
            return integerScreen;
    }

    // Method that updates the screen
    updateScreen() {
        this.currValueTextElement.innerText = this.getScreenNumber(this.currValue);
        if (this.operation != null)
            this.prevValueTextElement.innerText = `${this.getScreenNumber(this.prevValue)} ${this.operation}`;
        else
            this.prevValueTextElement.innerText = '';
    }
}

// Decalring variables to get elements from html file
const prevValueTextElement = document.querySelector('[prev-value]');
const currValueTextElement = document.querySelector('[curr-value]');
const clearButton = document.querySelector('[clear]');
const deleteButton = document.querySelector('[delete]');
const operationButtons = document.querySelectorAll('[operation]');
const numberButtons = document.querySelectorAll('[number]');
const equalsButton = document.querySelector('[equals]');

// Creating a new calculator object
const calculator = new Calculator(prevValueTextElement, currValueTextElement);

// EventListener for when a number button is clicked
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateScreen();
    });
});

// EventListener for when a operation button is clicked
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText);
        calculator.updateScreen();
    });
});

// EventListener for when equals button is clicked
equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateScreen();
});

// EventListener for when the clear button is clicked
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateScreen();
});

// EventListener for when the delete button is clicked
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateScreen();
});






