$(function(){  
    const feedbackElement = $("<p id='feedback'></p>")
    const turnElement = $('<p id="turn"></p>')
    const originalTurnText = "Player: " + game.getTurn(); 
    let boardPos; 
    
    let winner = "";
    //ai.isAI = true;
    makeGrid();
    gameLoop(winner);
    $("#game-container").append(feedbackElement);
    turnElement.text("Player: " + game.getTurn())
    $("#game-container").prepend(turnElement);

    $(".grid-item").on("click", function(){          
        if(!ai.isAI){ 
            winner = game.winCheck(game.board);    
            if(winner === ""){                                                   
                game.placeCoin(getRow(boardPos), getColumn(boardPos), game.getTurn()) 
                placeElement(boardPos); 
                game.turn = !game.turn;             
                turnElement.text("Player: " + game.getTurn())                     
            }
            placeWinText(winner, feedbackElement)                     
        }else{ 
            game.changeTurn('O')
            winner = game.winCheck(game.board);         
            if(game.currentPlayer === playerTwo.coin){
                let r = getRow(boardPos), c = getColumn(boardPos);
                console.log(r);
                if(game.board[r][c] === ''){
                    if(winner === ''){
                        game.placeCoin(getRow(boardPos), getColumn(boardPos), playerTwo.coin)
                        placeElement(boardPos);
                        game.currentPlayer = ai.aiCoin;              
                        ai.generateScore();
                        aiPlaceElement(ai.aiCoinPos.row, ai.aiCoinPos.col);  
                    }
                }
                aiPlaceElement(ai.aiCoinPos.row, ai.aiCoinPos.col);
                placeWinText(winner, feedbackElement);
            }
        }
        console.log(winner)
    })
    $(".grid-item").on("mouseover", function(e){    
        boardPos = e.target.id;             
    })
    $(".grid-item").bind("DOMNodeInserted", function(){
        if(winner !== ''){
            
        }
    })
    $("#ai-switch").on("change", function(e){
        ai.isAI = e.target.checked;      
        startAi();
        turnElement.text("HUMAN VS COMPUTER")
        if(!ai.isAI){
            game.clearBoard();
            clearBoardUI();
            turnElement.text(originalTurnText)
        }
    })
})
function startAi(){
    if(ai.isAI){
        game.clearBoard();
        clearBoardUI();
        game.currentPlayer = ai.aiCoin;
        ai.generateScore();
        aiPlaceElement(ai.aiCoinPos.row, ai.aiCoinPos.col);
    }
}
function getRow(boardPos){
    let cell = $("#"+boardPos);
    console.log(cell.children());
    console.log(cell.children().length);
    if(cell.children().length == 0)
        return parseInt(cell.attr("class").split(' ')[1].replace(/\D/g, ""));
}
function getColumn(boardPos){
    return parseInt($("#"+boardPos).attr("class").split(' ')[2].replace(/\D/g, ""));
}
function clearBoardUI(){
    $(".grid-item").empty();
}
function makeGrid(rows = 3, cols = 3){
    let i = 0;
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {           
            i++;
            let cell = $(`<div class="grid-item row-${x} col-${y}" id="${i - 1}"></div>`);
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
 function aiPlaceElement(row, col){ 
    let aiItem = $('<img id="ai-player" src="assets/X.png"/>');
    let gridItem = $(`.row-${row}.col-${col}`);
    let itemChild = gridItem.children().length;
    console.log(gridItem)
    if (itemChild < 1){
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
function gameLoop(winner){
    if(winner === ''){
        setInterval(function(){
            onWin(winner)
        }, 100)
    }else{
        clearInterval(onWin)
    }
}
function onWin(winner){
    if(winner !== ''){
        placeWinText(winner, feedbackElement);
        game.clearBoard();
        clearBoardUI();
    }
}

