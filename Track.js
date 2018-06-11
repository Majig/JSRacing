var trackGrid =
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_GAP = 1;
const TRACK_COLUMNS = 20;
const TRACK_ROWS = 15;

function drawTracks() {
    for (var column = 0; column < TRACK_COLUMNS; column++) {
        for (var row = 0; row < TRACK_ROWS; row++) {
            if (isWallAtTileCoord(column, row)) {
                var tileX = column * TRACK_WIDTH;
                var tileY = row * TRACK_HEIGHT;

                colorRect(tileX, tileY,
                    TRACK_WIDTH - TRACK_GAP, TRACK_HEIGHT - TRACK_GAP, "blue");
            }
        }
    }
}

// true, if at coord trackGrid is a TRACK_WALL;
function isWallAtTileCoord(x, y) {
    var trackIndex = trackTileToIndex(x, y);
    return (trackGrid[trackIndex] == TRACK_WALL);
}

// calculates exact grid position by taking pixel position and rounding it down
// then checks whether the tile is a TRACK_ROAD
function checkForTrackAtPixelCoord(x, y) {
    var x = Math.floor(x / TRACK_WIDTH);
    var y = Math.floor(y / TRACK_HEIGHT);

    var trackIndex = trackTileToIndex(x, y);

    if (trackGrid[trackIndex] == TRACK_ROAD) {
        return true;
    }
}

// calculates track tile with given x and y value
function trackTileToIndex(x, y) {
    return (x + TRACK_COLUMNS * y);
}