const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

var steerLeft = false;
var accelerate = false;
var steerRight = false;
var reverse = false;

const ROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}

function keyPressed(e) {
    document.getElementById("debugText").innerHTML = "KeyCode pushed: " + e.keyCode;
    setKeyHoldState(e.keyCode, true);

    // prevents the key's default function (e.g. scroll the page)
    e.preventDefault();
}

function keyReleased(e) {
    document.getElementById("debugText").innerHTML = "KeyCode released: " + e.keyCode;
    setKeyHoldState(e.keyCode, false);

    e.preventDefault();
}

function setKeyHoldState(key, setTo) {
    switch (key) {
        case LEFT_ARROW:
            steerLeft = setTo;
            break;
        case UP_ARROW:
            accelerate = setTo;
            break;
        case RIGHT_ARROW:
            steerRight = setTo;
            break;
        case DOWN_ARROW:
            reverse = setTo;
            break;
        default:
            return;
    }
}

// test-function for click-listener
function mouseClicked(e) {
    console.log("click noticed");
    // car1.x = e.clientX;
    // car1.y = e.clientY;
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