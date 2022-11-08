

let playerRed = "Red";
let playerYellow = "Yellow";
let currPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

// Typical 6x7 boards
let rows = 6;
let columns = 7;

window.onload = function(){
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]
    

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setDisc);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setDisc(){
    if (gameOver){
        return; // not allowing any more disc to be set
    }

    let coords = this.id.split("-"); //"0-0" ->["0", "0"]
    let r = parseInt(coords[0]); // because they are strings they to be parseInt
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0){
        return;
    }

    board[r][c] = currPlayer
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed){
        tile.classList.add("red-disc");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-disc");
        currPlayer = playerRed;

    }
    r -= 1;
    currColumns[c] = r;

    checkWinner();

}