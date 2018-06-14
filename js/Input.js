const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    p1.setupControls(UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW);
    p2.setupControls(W_KEY, S_KEY, A_KEY, D_KEY);
}

function keyPressed(e) {
    // document.getElementById("debugText").innerHTML = "KeyCode pushed: " + e.keyCode;
    setKeyHoldState(e.keyCode, p1, true);
    setKeyHoldState(e.keyCode, p2, true);

    // prevents the key's default function (e.g. scroll the page)
    e.preventDefault();
}

function keyReleased(e) {
    // document.getElementById("debugText").innerHTML = "KeyCode released: " + e.keyCode;
    setKeyHoldState(e.keyCode, p1, false);
    setKeyHoldState(e.keyCode, p2, false);

    e.preventDefault();
}

function setKeyHoldState(key, car, setTo) {
    switch (key) {
        case car.steerLeftKey:
            car.steerLeft = setTo;
            break;
        case car.accelerateKey:
            car.accelerate = setTo;
            break;
        case car.steerRightKey:
            car.steerRight = setTo;
            break;
        case car.reverseKey:
            car.reverse = setTo;
            break;
        default:
            return;
    }
}

// test-function for click-listener
function mouseClicked(e) {
    console.log("click noticed");
}

// returns calculateMousePos.x and calculateMousePos.y values
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // account for the marings, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}