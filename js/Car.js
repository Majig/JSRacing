const ROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.05;
const REVERSE_POWER = 0.02;
const TURN_RATE = 0.01;
const MIN_TURN_SPEED = 0.05;

var steerLeft = false;
var accelerate = false;
var steerRight = false;
var reverse = false;

function carClass() {
    this.x = 0;
    this.y = 0;

    this.steerLeft = false;
    this.accelerate = false;
    this.steerRight = false;
    this.reverse = false;

    this.setupControls = function (upKey, downKey, leftKey, rightKey) {
        this.accelerateKey = upKey;
        this.reverseKey = downKey;
        this.steerLeftKey = leftKey;
        this.steerRightKey = rightKey;
    }

    this.driveCar = function () {
        if (Math.abs(this.speed) > MIN_TURN_SPEED) {
            if (this.steerLeft) this.turnCarLeft();
            if (this.steerRight) this.turnCarRight();
        }

        if (this.accelerate) this.accelerateCar();
        if (this.reverse) this.reverseCar();

        var nextX = this.x + Math.cos(this.angle) * this.speed;
        var nextY = this.y + Math.sin(this.angle) * this.speed;
        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

        switch (drivingIntoTileType) {
            case TRACK_ROAD:
                this.x = nextX;
                this.y = nextY;
                break;
            case TRACK_GOAL:
                // todo
                document.getElementById("debugText").innerHTML =
                    this.myName + " hit the goal line";
                p1.carReset();
                p2.carReset();
                break;
            case TRACK_WALL:
            default:
                this.speed = 0;
        }

        this.speed *= ROUNDSPEED_DECAY_MULT;
    }
    this.initCar = function (whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.carReset();
    }

    this.carReset = function () {
        this.speed = 0;
        this.angle = -0.5 * Math.PI;

        if (this.homeX == undefined) {
            for (var i = 0; i < trackGrid.length; i++) {
                if (trackGrid[i] == TRACK_PLAYER) {
                    var tileRow = Math.floor(i / TRACK_COLUMNS);
                    var tileCol = i % TRACK_COLUMNS;
                    this.homeX = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
                    this.homeY = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
                    trackGrid[i] = TRACK_ROAD;
                    break;
                }
            }
        }

        this.x = this.homeX;
        this.y = this.homeY;
    }

    this.drawCar = function () {
        drawImageCenteredAtCoordWithRotation(this.myBitmap,
            this.x, this.y, this.angle);
    }

    this.turnCarLeft = function () {
        this.angle -= TURN_RATE * Math.PI;
    }

    this.accelerateCar = function () {
        this.speed += DRIVE_POWER;
    }

    this.turnCarRight = function () {
        this.angle += TURN_RATE * Math.PI;
    }

    this.reverseCar = function () {
        this.speed -= REVERSE_POWER;
    }

} // end of class definition