$(function(){
    let boardPos; 
    const feedbackElement = $("<p id='feedback'></p>")
    const turnElement = $('<p id="turn"></pN')
    let winner = "";
    makeGrid();

    $("#game-container").append(feedbackElement);
    turnElement.text("Player: " + game.getTurn())
    $("#game-container").prepend(turnElement);
    $(".grid-item").on("click", function(){      
        winner = game.winCheck(game.board);
        if(winner === ""){
            placeElement(boardPos);
            game.placeCoin(getRow(boardPos), getColumn(boardPos)) 
            game.changeTurn();
            turnElement.text("Player: " + game.getTurn())
           
        } 
        placeWinText(winner, feedbackElement) 
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

function placeWinText(winner, feedbackElement){
    if(winner === ""){
        feedbackElement.text("")
    }else{
        if (winner === 'tie'){
            feedbackElement.text(`You've tied, you both equally suck!`)
        }else{
            feedbackElement.text(`Winner is ${winner}`)
        }
    }
}

