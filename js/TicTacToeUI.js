$(function(){  
    const feedbackElement = $("<p id='feedback'></p>")
    const turnElement = $('<p id="turn"></pN')

    let boardPos; 
    
    let winner = "";
    ai.isAI = true;
    makeGrid();
    ai.generateScore();
    let boardAIPos = ai.aiCoinPos.row + ai.aiCoinPos.col + 1;
    aiPlaceElement(boardAIPos);
    
    $("#game-container").append(feedbackElement);
    turnElement.text("Player: " + game.getTurn())
    $("#game-container").prepend(turnElement);
    console.log(game.turn)
    $(".grid-item").on("click", function(){          
        winner = game.winCheck(game.board); 
        console.log(game.board);
        if(!ai.isAI){          
            if(winner === ""){                                                   
                game.placeCoin(getRow(boardPos), getColumn(boardPos), game.getTurn()) 
                placeElement(boardPos); 
                game.turn = !game.turn;             
                turnElement.text("Player: " + game.getTurn())                     
            }
            placeWinText(winner, feedbackElement)                     
        }else{
            // if(game.currentPlayer === playerOne.coin){
            //     game.placeCoin(getRow(boardPos), getColumn(boardPos), game.getTurn())
            //     placeElement(boardPos); 
            //     turnElement.text("Player: " + game.getTurn())    
            //     game.turn = !game.turn; 
            //     console.log(game.turn);        
            // }else{
            //     aiPlaceElement(ai.aiCoinPos.row, ai.aiCoinPos.col)
            //     game.currentPlayer = ai.aiCoin             
            //     ai.generateScore();
            // }
            let r = getRow(boardPos), c = getColumn(boardPos);
            if(game.board[r][c] === ''){
                game.placeCoin(getRow(boardPos), getColumn(boardPos), playerTwo.coin)
                placeElement(boardPos);
                game.currentPlayer = ai.aiCoin;
                boardAIPos = ai.aiCoinPos.row + ai.aiCoinPos.col + 1;
            }
        }
        console.log(winner)
    })
    $(".grid-item").on("mouseover", function(e){     
        boardPos = e.target.id;
        ai.generateScore();
        console.log(ai.aiCoinPos);
        console.log(boardAIPos);
        aiPlaceElement(boardAIPos);    
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
    let playerItem = game.turn ? '<img id="player-one" src="assets/X.png"/>'
     : ' <img id="player-two" src="assets/O.png"/>';     
    gridItem.append(playerItem);
}
function aiPlaceElement(boardPos){ 
    let aiItem = $('<img id="ai-player" src="assets/X.png"/>');
    let gridItem = $('#'+boardPos);  
    console.log(gridItem)
    gridItem.append(aiItem)          
    
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

