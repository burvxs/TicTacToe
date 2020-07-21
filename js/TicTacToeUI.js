playerOne.isPlayerOneTurn = true;
let board = game.board;
let boardPos; 

$(function(){
    makeGrid();
    $(".grid-item").on("click", function(){
        placeElement(boardPos);
        game.placeCoin(getRow(boardPos), getColumn(boardPos)) 
        let winner = game.winCheck(game.board)
        game.changeTurn();
        if(winner !== null){
            if (winner === 'tie'){
                console.log("TIE")
            }else{
                console.log(winner);
            }
        }
        console.log(game.board)
    })
    $(".grid-item").on("mouseover", function(e){     
        boardPos = e.target.id;
    })
    
})

function getRow(boardPos){
    return parseInt($("#"+boardPos).attr("class").split(' ')[1].replace(/\D/g, ""));
}
function getColumn(boardPos){
    return parseInt($("#"+boardPos).attr("class").split(' ')[2].replace(/\D/g, ""));
}
function makeGrid(rows = 3, cols = 3){
    let i = 0;
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {           
            i++;
            let cell = $(`<div class="grid-item row-${x} col-${y}" id="${i}"></div>`);
            cell.css({left : x + "px", top : y +'px'});
            $("#game-container").append(cell);
        }       
    }
}
function placeElement(boardPos){
    let gridItem = $(`#${boardPos}`);
    let playerItem = game.turn ? '<img id="player-one" src="assets/X.png"/>' : ' <img id="player-two" src="assets/O.png"/>';
    gridItem.append(playerItem);
}

