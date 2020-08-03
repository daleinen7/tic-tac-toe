/*----- constants -----*/
const winningLogBook = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*----- app's state (variables) -----*/
let grid = [];
playerXTurn = true;

/*----- cached element references -----*/
const gridEls = document.querySelectorAll('.square');
const hudEl = document.getElementById('hud');

/*----- event listeners -----*/
// on click - if the square is unselected light up and select the grid square for the player
document.getElementById('board').addEventListener('click', squareSelect);
document.getElementById('reset').addEventListener('click', init);

// on hover - player's token will light up if the square is not already selected

/*----- functions -----*/
function init() {
    grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    hud.style.color = 'var(--x-color';
    playerXTurn = true;
    render();
}

function squareSelect(e) {
    // find the square clicked and have it's ID update the corrosponding array index in the grid array
    
    // get the number portion of the square id from the id
    const index = parseInt(e.target.id.replace('square', ''));
    
    // if the square is taken already
    if (grid[index] != 0 || checkWinner()) return;
    
    // toggle player's turn
    if (playerXTurn) {
        grid[index] = 1;
    } else if (!playerXTurn) {
        grid[index] = -1;
    }

    playerXTurn = playerXTurn ? false : true;
    render();
}

function render() {
    // for the length of the grid array
    for (let i = 0; i < grid.length; i++) {
        
        // if the grid square is not selected (0)
        if (grid[i] === 0) {
            // set the color to both characters to black
            gridEls[i].lastChild.classList.remove("x-select", "o-select");
            gridEls[i].firstChild.classList.remove("x-select", "o-select");
            gridEls[i].style.color = "var(--unselected)";
        // if the grid square is X (1)
        } else if (grid[i] === 1) {
            // put X in front of O and set the color to x color
            gridEls[i].innerHTML = '<span class="o">O</span> <span class="x">X</span>'
            gridEls[i].lastChild.classList.add("x-select");
            gridEls[i].firstChild.style.color = "var(--unselected)";
        // if the grid square is o (-1)
        } else if (grid[i] === -1) {
            // Put O in front of X and set the color to o color
            gridEls[i].innerHTML = '<span class="x">X</span> <span class="o">O</span>'
            gridEls[i].lastChild.classList.add("o-select");
            gridEls[i].firstChild.style.color = "var(--unselected)";
        }
    }
    
    if (checkWinner() === 'Player O') {
        hud.style.color = 'var(--o-color)';
    }

    hud.innerHTML = displayMessage();

}

function displayMessage() {
    let msg = "";
    // if it's the start of the game
    if (!grid.includes(1) && !grid.includes(-1)) {
        msg = 'Game start. X goes first';
    } else if (checkWinner()) {
        msg = `${checkWinner()} wins. The prize is theirs!`;
    } else if (playerXTurn) {
        msg = 'X turn ...';
    } else {
        msg = 'O makes their move!';
    }
    
    return msg;
}

function checkWinner(){

    let winner = false;

    // for each combination in winningLogBook
    for (let i = 0; i < winningLogBook.length; i++) {
        const winLog = winningLogBook[i];
        // check if this combination of indexes in the grid array adds up to 3    

        if (grid[winLog[0]] + grid[winLog[1]] + grid[winLog[2]] === 3) {
            console.log("Should display");
        }

        // Decide winner here
        if (grid[winLog[0]] + grid[winLog[1]] + grid[winLog[2]] === 3) {
            winner = 'Player X';
            break;
        } else if (grid[winLog[0]] + grid[winLog[1]] + grid[winLog[2]] === -3) {
            winner = 'Player O';
            break;
        }
        
    }

    if (grid.includes(0) === false && winner === false) {
        winner = 'Techno-Cat';
    }

    return winner;
}

init();