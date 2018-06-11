var carPic = document.createElement("img");
var carPicLoaded = false;

var car1 = {
    x: 0,
    y: 0,
    angle: -0.5 * Math.PI,
    speed: 0,
}

carPic.onload = function () {
    carPicLoaded = true;
}

function driveCar() {
    if (steerLeft && Math.abs(car1.speed) > MIN_TURN_SPEED) turnCarLeft();
    if (steerRight && Math.abs(car1.speed) > MIN_TURN_SPEED) turnCarRight();
    if (accelerate) accelerateCar();
    if (reverse) reverseCar();

    var nextX = car1.x + Math.cos(car1.angle) * car1.speed;
    var nextY = car1.y + Math.sin(car1.angle) * car1.speed;

    if (checkForTrackAtPixelCoord(nextX, nextY)) {
        car1.x += Math.cos(car1.angle) * car1.speed;
        car1.y += Math.sin(car1.angle) * car1.speed;
    } else {
        car1.speed = 0;
    }

    // checkCar();
    car1.speed *= ROUNDSPEED_DECAY_MULT;
}

function carReset() {
    for (var i = 0; i < trackGrid.length; i++) {
        if (trackGrid[i] == TRACK_PLAYER) {
            var tileRow = Math.floor(i / TRACK_COLUMNS);
            var tileCol = i % TRACK_COLUMNS;
            car1.x = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
            car1.y = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
            trackGrid[i] = TRACK_ROAD;
            //// removing the debug output that showed the car start position
            break; // found it, so no need to keep searching 
        }
    }
}

function drawCar() {
    if (carPicLoaded) {
        drawImageCenteredAtCoordWithRotation(carPic, car1.x, car1.y, car1.angle);
    }
}

function turnCarLeft() {
    car1.angle -= TURN_RATE * Math.PI;
}

function accelerateCar() {
    car1.speed += DRIVE_POWER;
}

function turnCarRight() {
    car1.angle += TURN_RATE * Math.PI;
}

function reverseCar() {
    car1.speed -= REVERSE_POWER;
}