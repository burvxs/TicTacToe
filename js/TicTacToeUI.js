$(function(){  
    const feedbackElement = $("<p id='feedback'></p>")
    const turnElement = $('<p id="turn"></pN')

    let boardPos; 
    let winner = "";
    ai.isAI = true;
    makeGrid();

    $("#game-container").append(feedbackElement);
    turnElement.text("Player: " + game.getTurn())
    $("#game-container").prepend(turnElement);
    console.log(game.turn)
    $(".grid-item").on("click", function(){      
        winner = game.winCheck(game.board);
        if(!ai.isAI){
            if(winner === ""){
                placeElement(boardPos);
                game.placeCoin(getRow(boardPos), getColumn(boardPos))           
                ai.generateScore(game.board);
                turnElement.text("Player: " + game.getTurn())        
                console.log(game.board);      
            } 
            placeWinText(winner, feedbackElement) 
        }else{
            if(game.turn){
                game.changeTurn('O');
                placeElement(boardPos);
                game.placeCoin(getRow(boardPos), getColumn(boardPos)) 
                game.changeTurn();
            }else{       
                game.board = ai.generateScore(game.board)
                aiPlaceElement(game.board)
            }
        }

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
function aiPlaceElement(board){ 
    let positions = ai.getAICoins(board);
    console.log(positions);
    for (let i = 0; i < positions.length; i++) {
        console.log('.grid-item .row-'+ positions[i].row + ' .col-' + positions[i].column)
        let gridItem = $('.grid-item, .row-'+ positions[i].row + ', .col-' + positions[i].column);
        let aiItem = '<img id="player-one" src="assets/X.png"/>';
        gridItem.append(aiItem)
    }
 }
function placeWinText(winner, feedbackElement){
    if(winner === ""){
        feedbackElement.text("")
    }else{
        if (winner === 'tie'){
            feedbackElement.text(`You've tied, you both equally suck!`)
        }else{
            feedbackElement.text(`Winner is: ${winner}`)
        }
    }
}

