
let playerOne = 'Red';
let playerTwo = 'Yellow';

let tableRow = document.getElementsByTagName('tr');
let tableData = document.getElementsByTagName('td');
let playerTurn = document.querySelector('.player-turn');

const slots = document.querySelectorAll('.slot');
const resetBtn = document.querySelector('.reset');

let currentPlayer = 1;
let winner;
playerTurn.textContent = `${playerOne}'s turn` 

for (i = 0; i < tableData.length; i ++){
    tableData[i].addEventListener('click', (e) =>{
        // console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});  

function changeColor(e){
    // Get clicked column index
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
        if (tableRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = 'red';
                if(horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${playerOne} WINS!`;
                    playerTurn.style.color = playerOne;
                    return alert (`${playerOne} WINS!`)
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!'
                    return alert ("DRAW!")
                }else{
                playerTurn.textContent = `${playerTwo}'s turn`;
                return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = 'yellow';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${playerTwo} WINS!`;
                    playerTurn.style.color = playerTwo;
                    return alert(`${playerTwo} WINS!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!'
                    return alert ('DRAW!')
            }else{
                playerTurn.textContent = `${playerOne}'s turn`
                return currentPlayer = 1;
            }
        }
    }
}

function colorMatchCheck(one, two, three, four){
    return(one == two && one === three && one === four && one !== 'white');
}

// Horizontal check for winner.
function horizontalCheck(){
    for(let row = 0; row < tableRow.length; row++){
        for(let col = 0; col < 4; col++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, 
                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                                tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}

function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < tableData.length; i++){
        if (tableData[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableData[i]);
        }
    }
    if (fullSlot.length === tableData.length){
        return true;
    }
}

reset.addEventListener('click', () =>{
    tableSlots.forEach(slots => {
        slots.style.backgroundColor = 'white';
    });
    playerTurn.style.backgroundColor = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `${playerOne}'s turn` : playerTurn.textContent = `${playerTwo}'s turn`);
});

}