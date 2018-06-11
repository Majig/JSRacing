var canvas;
var draw;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BACKGROUND_COLOR = "black";

var gameOver = false;

window.onload = function () {
    canvas = document.getElementById("game");
    draw = canvas.getContext("2d");
    carPic.src = "images/player1.png";

    var framesPerSecond = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, framesPerSecond);

    draw.textAlign = "center";

    initInput();
    carReset();
}

function moveEverything() {
    if (gameOver) {
        return;
    }

    driveCar();
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);

    if (gameOver) {
        // todo: halt game and add function
    } else {
        drawTracks();
        drawCar();
        // colorCircle(car1.x, car1.y, CAR_RADIUS, CAR_COLOR);
    }
}