const winningLogBook = [
    ['x','x','x', '0','0','0', '0','0','0'],
    ['0','0','0', 'x','x','x', '0','0','0'],
    ['0','0','0', '0','0','0', 'x','x','x'],

    ['x','0','0', 'x','0','0', 'x','0','0'],
    ['0','x','0', '0','x','0', '0','x','0'],
    ['0','0','x', '0','0','x', '0','0','x'],

    ['x','0','0', '0','x','0', '0','0','x'],
    ['0','0','x', '0','x','0', 'x','0','0']
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
    grid = [1, 1, 0, 1, 0, 0, 0, 0, 0];
    playerXTurn = true;
    render();
    console.log(grid.toString().replace("1", "x"));

}

function squareSelect(e) {
    // find the square clicked and have it's ID update the corrosponding array index in the grid array
    const index = parseInt(e.target.id.replace('square', ''));

    // if the square is taken already
    if ((grid[index] != 0) || checkWinner() === true) return;

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
    
    checkWinner();

    hud.innerHTML = displayMessage();

}

function displayMessage() {
    let msg = "";
    // if it's the start of the game
    if (!grid.includes(1) && !grid.includes(-1)) {
        msg = 'Game start. X goes first';
    } else if (checkWinner()) {
        msg = `${checkWinner()} wins. The prize is theirs!`
    } else if (playerXTurn) {
        msg = 'X turn ...';
    } else {
        msg = 'O makes their move!';
    }
    // if someone one or it was a tie

    return msg;
}

function checkWinner(){
    // convert grid to string to compare lists to
    let winner;
    for (let i = 0; i < winningLogBook.length; i++) {
        const list = winningLogBook[i];
        const strGrid = grid.toString();
        console.log(grid.toString().replace("1", "x"));
        console.log(list.toString());

        // if (list === grid.toString().replace("1", "x")) {
        //     console.log("this should count as a win");
        //     return "Player X";
        //     break;
        // } else if (list === grid.toString().replace("-1", "x")) {
        //     return "Player O";
        //     break;
        // } else if (grid.includes(0) === false) {
        //     return "Cat";
        //     break;
        // } else {
        //     return;
        // }
    }
}

init();