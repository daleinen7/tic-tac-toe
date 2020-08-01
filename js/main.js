/*----- constants -----*/

/*----- app's state (variables) -----*/
const grid = [0, 0, -1, 0, 1, 0, 0, 0, 0 ,0];


/*----- cached element references -----*/
const gridEls = document.querySelectorAll('.square');

/*----- event listeners -----*/
// on click - if the square is unselected light up and select the grid square for the player

// on hover - player's token will light up if the square is not already selected

/*----- functions -----*/
// INIT


function render() {
    // for the length of the grid array
    for (let i = 0; i < grid.length - 1; i++) {
        
        // if the grid square is not selected (0)
        if (grid[i] === 0) {
            // set the color to both characters to black
            gridEls[i].style.color = "var(--unselected)";
        // if the grid square is X (1)
        } else if (grid[i] === 1) {
            // put X in front of O and set the color to x color
            gridEls[i].innerHTML = '<span class="o">O</span> <span class="x">X</span>'
            gridEls[i].lastChild.style.color = "var(--x-color)";
            gridEls[i].firstChild.style.color = "var(--unselected)";
        // if the grid square is o (-1)
        } else if (grid[i] === -1) {
            // Put O in front of X and set the color to o color
            gridEls[i].innerHTML = '<span class="x">X</span> <span class="o">O</span>'
            gridEls[i].lastChild.style.color = "var(--o-color)";
            gridEls[i].firstChild.style.color = "var(--unselected)";
        }
    }
}

render();