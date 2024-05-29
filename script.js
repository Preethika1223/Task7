document.addEventListener("DOMContentLoaded", function() {
    const calculator = document.getElementById('calculator');

    const display = document.createElement('input');
    display.setAttribute('type', 'text');
    display.setAttribute('readonly', true);
    display.setAttribute('id', 'display');
    display.className = 'form-control mb-3';
    calculator.appendChild(display);

    const buttons = [
        '7', '8', '9', '/', 
        '4', '5', '6', '*', 
        '1', '2', '3', '-', 
        '0', '.', '=', '+', 
        'C', 'M+', 'M-', 'MC', '%'
    ];

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    buttons.forEach(function(button) {
        const btn = document.createElement('button');
        btn.textContent = button;
        btn.className = 'btn btn-secondary m-1';
        btn.setAttribute('data-value', button);
        btn.addEventListener('click', handleButtonClick);
        buttonContainer.appendChild(btn);
    });

    calculator.appendChild(buttonContainer);

    let memory = 0;

    function handleButtonClick(event) {
        const value = event.target.getAttribute('data-value');

        if (!isNaN(value) || value === '.') {
            display.value += value;
        } else {
            switch (value) {
                case 'C':
                    display.value = '';
                    break;
                case '=':
                    try {
                        display.value = eval(display.value);
                    } catch {
                        alert("Invalid Expression");
                        display.value = '';
                    }
                    break;
                case 'M+':
                    memory += parseFloat(display.value) || 0;
                    break;
                case 'M-':
                    memory -= parseFloat(display.value) || 0;
                    break;
                case 'MC':
                    memory = 0;
                    break;
                default:
                    display.value += ` ${value} `;
            }
        }
    }

    document.addEventListener('keydown', function(event) {
        if (!isFinite(event.key) && !['+', '-', '*', '/', '=', '.', 'Enter', 'Backspace', 'Delete'].includes(event.key)) {
            alert("Only numbers are allowed");
            event.preventDefault();
        } else if (isFinite(event.key) || event.key === '.') {
            display.value += event.key;
        } else if (event.key === 'Enter') {
            try {
                display.value = eval(display.value);
            } catch {
                alert("Invalid Expression");
                display.value = '';
            }
        } else if (event.key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        } else if (['+', '-', '*', '/', '%'].includes(event.key)) {
            display.value += ` ${event.key} `;
        }
    });
});
