let numColors = 6;
let colors = [];
let pickedColor;

// fetch html elements
let circles = document.querySelectorAll('.circle');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let colorDisplay = document.querySelector('#colorDisplay');
let modeButtons = document.querySelectorAll('.mode');
let resetButton = document.querySelector('#reset');

// start up initialization / IIFE
(function init() {
    reset();
    correctColorValidator();
    gameMode();

})();

function reset() {
    colors = randomColorGenerator(numColors);
    pickedColor = pickColor();
    // set color display  to equal checked color
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = 'steelblue';
    // assign random color to each circle
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = colors[i];
    }
    resetButton.textContent = 'New colors';
    messageDisplay.textContent = '';
}

resetButton.addEventListener('click', function () {
    reset();
});


// Easy and hard mode
function gameMode() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Easy' ? numColors = 3 : numColors = 6;

            reset();
            for (let i = 0; i < circles.length; i++) {
                if (colors[i]) {
                    circles[i].style.display = 'block';
                } else {
                    circles[i].style.display = 'none';
                }
            }
        });
    }
}

// set up clicked circle validator
function correctColorValidator() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].addEventListener('click', function () {
            let checkedColor = this.style.backgroundColor;

            if (checkedColor === pickedColor) {
                correctCircle();
                messageDisplay.textContent = 'Correct!';
                h1.style.backgroundColor = checkedColor;
                resetButton.textContent = 'Play again?'
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Try Again';
            }
        });
    }
}

// Change color of all circles when guess is correct
function correctCircle() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = pickedColor;
    }
}
// --- RANDOM COLOR GENERATOR ---

// take randomRBGColor and push into an array
function randomColorGenerator(num) {
    // create an array
    let arr = [];

    // push colors into an array
    for (let i = 0; i < num; i++) {
        arr.push(randomRGBColor());
    }

    // return array of random RGB colors
    return arr;
}

// create RGB color
function randomRGBColor() {
    // red spectrum
    let r = Math.floor(Math.random() * 256);
    // green spectrum
    let g = Math.floor(Math.random() * 256);
    // blue spectrum
    let b = Math.floor(Math.random() * 256);

    // return random color
    return `rgb(${r}, ${g}, ${b})`;
}

// --- Random color from array ---
function pickColor() {
    // pick random color from array
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
// -----------------------------------------