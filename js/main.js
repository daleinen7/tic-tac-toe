/*----- constants -----*/

/*----- app's state (variables) -----*/
const grid = [0, 0, 0, 0, 1, 0, 0, 0, 0 ,0];


/*----- cached element references -----*/
const gridEls = document.querySelectorAll('.square');

/*----- event listeners -----*/


/*----- functions -----*/


function render() {
    for (let i = 0; i < grid.length - 1; i++) {
        
        
        if (grid[i] === 0) {

            gridEls[i].style.color = "black";
            
        }
         
    }
}

render();