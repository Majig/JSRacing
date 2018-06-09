var canvas;
var draw;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BACKGROUND_COLOR = "black";

const BALL_RADIUS = 10;
const BALL_COLOR = "white";

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_COLOR = "white";

var brick_topleft_x;
const BRICK_TOPLEFT_Y= 20;
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;
const BRICK_COLUMNS = 12;
const BRICK_ROWS = 10;
var brickGrid = new Array (BRICK_COLUMNS * BRICK_ROWS); // boolean Array for brick status

var gameOver = false;
var autoPlay = false;
var randomizeBricks = false;
var brickCounter = brickGrid.length;

var paddle = {
    x: (CANVAS_WIDTH / 2) - (PADDLE_WIDTH / 2),
    y: CANVAS_HEIGHT - CANVAS_HEIGHT * 0.1,
    score: 0,
}

var ball = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    speedX: 8,
    speedY: 8,
}

window.onload = function() {
    canvas = document.getElementById("game");
    draw = canvas.getContext("2d");

    canvas.addEventListener("mousedown", mouseClicked, false);

    canvas.addEventListener("mousemove", function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle.x = mousePos.x - (PADDLE_WIDTH/2);
    } );

    var framesPerSecond = 30;
    setInterval (function() {
        moveEverything();
        drawEverything();
    }, framesPerSecond);

    brick_topleft_x = calculateBrickTopLeftX(canvas.width);
    resetBricks();
    
    draw.textAlign = "center";
}

function calculateBrickTopLeftX(width) {
    var wallWidth = BRICK_COLUMNS * BRICK_WIDTH;
    var emtpySpace = width - wallWidth;
    return emtpySpace / 2;
}

function resetBricks()	{
    for(var	i=0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
        if (randomizeBricks) {
            if(Math.random() < 0.5)	{
                    brickGrid[i] = 1;
            } else {
                    brickGrid[i] = 0;
            }
        }

        brickGrid[i] = 1;
    }
}

function moveEverything () {
    if (gameOver) {
        return;
    }

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    checkBall();

    if (autoPlay) {
        paddle.x = ball.x - PADDLE_WIDTH / 2;
    }

    checkForAndRemoveBrickAtPixelCoord(ball.x, ball.y);
}

function checkBall () {
    if (ball.x > canvas.width || ball.x < 0) {
        ball.speedX *= -1;
    } else if (ball.y < 0) {
        ball.y = 0;
        ball.speedY *= -1;
    } else if (ball.y >= paddle.y && ball.y <= (paddle.y + PADDLE_HEIGHT) && 
            ball.x > paddle.x && ball.x < paddle.x + PADDLE_WIDTH) {
        ball.speedY *= -1;
        var deltaX = ball.x - (paddle.x + PADDLE_WIDTH/2);
        ball.speedX = deltaX * 0.35;

        if (brickCounter <= 0) {
            brickCounter = BRICK_COLUMNS * BRICK_ROWS;
            resetBricks();
        }

        } else if (ball.y > canvas.height) {
            ballReset();
        }
}

function ballReset () {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    
    ball.speedX = Math.floor(Math.random() * 20) -10;
}

function drawEverything () {
    colorRect (0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);

    if (gameOver) {
        // todo: halt game and add function
    } else {
        colorCircle(ball.x, ball.y, BALL_RADIUS, BALL_COLOR);
        colorRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);
        drawBricks();
    }
}

function colorRect (x, y, width, height, color) {
    draw.fillStyle = color;
    draw.fillRect (x, y, width, height);
}

function colorCircle (centerX, centerY, radius, color) {
    draw.fillStyle = color;
    draw.beginPath();
    draw.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    draw.fill();
}

function drawBricks () {
    for (var column = 0; column < BRICK_COLUMNS; column++) {
        for (var row = 0; row < BRICK_ROWS; row++) {
            if (isBrickAtTileCoord(column,row)) {
                var brickX = brick_topleft_x + column * BRICK_WIDTH;
                var brickY = BRICK_TOPLEFT_Y + row * BRICK_HEIGHT;
                
                colorRect(brickX, brickY, 
                    BRICK_WIDTH - BRICK_GAP, BRICK_HEIGHT - BRICK_GAP, "blue");
            }
        }
    }
}

function checkForAndRemoveBrickAtPixelCoord (x, y) {
    var hitX = Math.floor((x - brick_topleft_x) / BRICK_WIDTH);
    var hitY = Math.floor((y - BRICK_TOPLEFT_Y) / BRICK_HEIGHT);

    if (hitX < 0 || hitX >= BRICK_COLUMNS ||
        hitY < 0 || hitY >= BRICK_ROWS) {
            return;
    }

    var brickIndex = brickTileToIndex(hitX, hitY);

    if (brickGrid[brickIndex] == 1) {
        brickGrid[brickIndex] = 0;
        brickCounter -= 1;
        ball.speedY *= -1;
    }

    // todo check for empty brickGrid
    // todo reflect horizontal collision
}

function brickTileToIndex (x, y) {
    return (x + BRICK_COLUMNS * y);
}

function isBrickAtTileCoord(x, y)	{
    var	brickIndex = brickTileToIndex(x, y);
    return (brickGrid[brickIndex] == 1);
}

// test-function for click-listener
function mouseClicked() {
    console.log("click noticed");
}

// returns calculateMousePos.x and calculateMousePos.y values
function calculateMousePos (evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // account for the marings, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}