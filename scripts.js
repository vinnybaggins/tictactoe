const result = document.querySelector("#result");
const winner = document.querySelector("#winner");
const game = document.querySelector("#game");
const playBtn = document.querySelector("#playBtn");

let rows = [];

const SQUARE = "\u25A1";
const TRIANGLE = "\u20E4";

let turn = SQUARE;

const side = 4;

/****************
initialization, creation of fields
****************/

for(let i = 0; i < side; i++)
{
    //creates the rows
    let currentRow = document.createElement("div");
    currentRow.classList.add("row");
    game.appendChild(currentRow);
    rows[i] = currentRow;

    // creates the fields of the current row
    for(let j = 0; j < side; j++)
    {
        let field = document.createElement("div");
        field.classList.add("field");
        
        field.addEventListener("click", function(){
            markField(field);
            setTimeout(() => {
                checkVictory();
            },
            2000);
        })
        
        currentRow.appendChild(field);
        rows[i][j] = field;
    }
}

/****************
Unfolding of the game
****************/

function markField (item)
{
    if(!item.classList.contains("clicked")){
        item.innerText = turn;
        if(turn === SQUARE){
            turn = TRIANGLE;
            item.classList.add("pink");
            item.classList.remove("green");
        }
        else{
            turn = SQUARE;
            item.classList.add("green");
            item.classList.remove("pink");
        }
        item.classList.add("clicked");
    }
}

function checkVictory () {
    
    //checks each row
    for (let y = 0; rows [y]; y++)
    {    
        let score = 0;
        let previousText = "";
        
        //checks fields in current row
        for (let x = 0; rows [y][x]; x++) {
            
            if (x !== 0 && rows [y][x].innerText === previousText && previousText) score++;
            
            previousText = rows [y][x].innerText;
        }
        
        if (score === side - 1) showVictory (previousText);
    }
    
    //checks each column
    for (let x = 0; x < side; x++)
    {    
        let score = 0;
        let previousText = "";
        
        //checks fields in current column
        for (let y = 0; y < side; y++) {
            
            if (y !== 0 && rows [y][x].innerText === previousText && previousText) score++;
            
            previousText = rows [y][x].innerText;
        }
        
        if (score === side - 1) showVictory(previousText);
    }
    
    //checks both diagonals
    for (let i = 0, score = 0, previousText = ""; i < side; i++)
    {    
        if (i !== 0 && rows [i][i].innerText === previousText && previousText) score++;
        
        previousText = rows [i][i].innerText;
        
        if (score === side - 1) showVictory(previousText);
    }
    for (let i = side - 1, j = 0, score = 0, previousText = ""; i >= 0; i--, j++)
    {
        if (j !== 0 && rows [j][i].innerText === previousText && previousText) score++;
        
        previousText = rows [j][i].innerText;
        
        if (score === side - 1) showVictory(previousText);
    }
}

/****************
Check and show the victory
****************/

function showVictory(player){
    winner.innerText = player;
    hide(game);
    show(result);
}

function show (element) {
    element.classList.remove("hide");
}
function hide (element) {
    element.classList.add("hide");
}