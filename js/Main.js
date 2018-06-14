var canvas;
var draw;

const FPS = 30;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BACKGROUND_COLOR = "black";

var gameOver = false;
var carName = "Blue Car";
var car2Name = "Green Car";

var p1 = new carClass();
var p2 = new carClass();

window.onload = function () {
    canvas = document.getElementById("game");
    draw = canvas.getContext("2d");

    loadImages();

    draw.textAlign = "center";

    initInput();
    p2.initCar(car2Pic, car2Name);
    p1.initCar(carPic, carName);
}

function startGameAfterLoading() {
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, FPS);
}

function moveEverything() {
    if (gameOver) {
        return;
    }

    p1.driveCar();
    p2.driveCar();
}

function drawEverything() {
    if (gameOver) {
        // todo: halt game and add function
    } else {
        drawTracks();
        p1.drawCar();
        p2.drawCar();
    }
}