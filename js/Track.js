var trackGrid =
       [4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
        1, 1, 5, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_COLUMNS = 20;
const TRACK_ROWS = 15;

function drawTracks() {
    var trackIndex = 0;
    var tileX = 0;
    var tileY = 0;
    for (var row = 0; row < TRACK_ROWS; row++) {
        tileX = 0;

        for (var column = 0; column < TRACK_COLUMNS; column++) {
            var trackTypeHere = trackGrid[trackIndex];
            draw.drawImage(trackPics[trackTypeHere], tileX, tileY);

            trackIndex++;

            tileX += TRACK_WIDTH;;            
        }   // end of column scan

        tileY += TRACK_HEIGHT;
    }   // end of row scan
}

// calculates exact grid position by taking pixel position and rounding it down
// then checks whether the tile is a TRACK_ROAD
function getTrackAtPixelCoord(x, y) {
    var x = Math.floor(x / TRACK_WIDTH);
    var y = Math.floor(y / TRACK_HEIGHT);

    if (x < 0 || x >= TRACK_COLUMNS ||
        y < 0 || y >= TRACK_ROWS) {
            return TRACK_WALL;   // avoiding array out of bound
    }

    var trackIndex = trackTileToIndex(x, y);
    return trackGrid[trackIndex];
}

// calculates track tile with given x and y value
function trackTileToIndex(x, y) {
    return (x + TRACK_COLUMNS * y);
}