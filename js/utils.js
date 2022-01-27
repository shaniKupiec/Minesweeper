'use strict'

function createMat(ROWS, COLS = ROWS) {
    var mat = [];
    for (var i = 0; i < ROWS; i++) {
        var row = [];
        for (var j = 0; j < COLS; j++) {
            row.push(createCell());
        }
        mat.push(row);
    }
    return mat;
}

function getLocation(i, j) {
    return { i: i, j: j };
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location);
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

function render(value, selector) {
    var el = document.querySelector(selector);
    el.innerHTML = value;
}

function renderAdditional(value, selector, length) {
    var str = '';
    for (let i = 0; i < length; i++) {
        str += value;
    }
    render(str, selector);
}

// Returns the class name for a specific cell
function getClassName(location) {
    return 'cell-' + location.i + '-' + location.j;
}

// combine the mat to one array
function matToArray() {
    var mat = [];
    for (var i = 0; i < gBoard.length; i++) {
        mat = mat.concat(gBoard[i]);
    }
    return mat;
}

// draw random num from an array
function drawNum(array) {
    var idx = getRandomInt(0, array.length - 1);
    var num = array[idx];
    array.splice(idx, 1);
    return num;
}

//timer
function startStopWatch() {
    gWatchInterval = setInterval(updateWatch, 1)
    gStartTime = Date.now()
}

function updateWatch() {
    var now = Date.now()
    var minutes;
    var seconds;
    var time = ((now - gStartTime) / 1000).toFixed(0); // to fixed?
    if (time < 60) {
        if (time < 10) seconds = '0' + time;
        else seconds = time;
        minutes = '00';
    }
    else {
        seconds = time % 60;
        if(seconds < 10) seconds = '0' + seconds;
        minutes = Math.floor(time / 60);
        if(minutes < 10) minutes = '0' + minutes;
        else if(minutes > 59){
            alert('too long you lost the game');
            gameOver(false, location)
        }
    }
    time = minutes + ':' + seconds;
    render(time, '.time');
}

function endStopWatch() {
    clearInterval(gWatchInterval);
    gWatchInterval = null;
}

// not in use:
function emptyCells() {
    var res = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (cell === EMPTY) res.push({ i: i, j: j });
        }
    }
    return res;
}

// Returns the location for a specific class name
function getLocationFromClass(className) {
    var str = className.slice(10);
    var location = str.split('-');
    return { i: +location[0], j: +location[1] };
}

function renderEndGame() {
    var strHTML = `<div class="end-game"> <button onclick = "init()" > Restart </button > <span></span> </div > `;
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML += strHTML;
}

function sortNums(nums) {
    var numsCopy = nums.slice()

    for (let i = 0; i < numsCopy.length; i++) {
        for (let j = 1; j < numsCopy.length - 1; j++) {
            if (numsCopy[j] < numsCopy[j - 1]) {
                var temp = numsCopy[j]
                numsCopy[j] = numsCopy[j - 1]
                numsCopy[j - 1] = temp
            }
        }
    }
    return numsCopy
}

function printPrimaryDiagonal(squareMat) {
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][d]
        console.log(item)
    }
}

function printSecondaryDiagonal(squareMat) {
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][squareMat.length - d - 1]
        console.log(item)
    }
}

function countAround(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = mat[i][j]
            if (currCell === '$') count++
        }
    }
    return count
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;

    }

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}