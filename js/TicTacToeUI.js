/*
    Ben Purvis 
    GA_SEi37
    7/24/2020
    TicTacToeUI javascript file containing all the GUI logic including the 
    game loop, events, one vs one game and the human vs ai game.
    The UI and game logic are completely seperated from each other.
*/
$(function(){  
    const feedbackElement = $("<p id='feedback'></p>")
    const turnElement = $('<p id="turn"></p>')
    const originalTurnText = "Player: " + game.getTurn(); 
    let boardPos; 
    
    let winner = "";
    makeGrid();

    $("#game-container").append(feedbackElement);
    turnElement.text("Player: " + game.getTurn())
    $("#game-container").prepend(turnElement);

    $(".grid-item").on("click", function(){          
        if(!ai.isAI){ 
            oneVsOneGame(boardPos) 
            turnElement.text("Player: " + game.getTurn())                                    
        }else{ 
            aiGameOnClick(boardPos);     
        }
    })
    $(".grid-item").on("mouseover", function(e){    
        boardPos = parseInt(e.target.id); 
        onMouseEnterItem(boardPos)
    })
    $(".grid-item").mouseleave(function(){
        $(this).css("background-color", "black")
    })
    $("#ai-switch").on("change", function(e){
        ai.isAI = e.target.checked;      
        startAi();
        turnElement.text("HUMAN VS COMPUTER")
        if(!ai.isAI){
            game.clearBoard();
            clearBoardUI();
            turnElement.text(originalTurnText)
            feedbackElement.text("")
            winner = ""
        }
    })
    const MIMIC_FPS = 33

    // Game Loop
    setInterval(onTick, MIMIC_FPS);

    /*  
        onTick runs constantly, MIMIC_FPS mimics 30 frames per second.
        Checks if the current player is 'X' and if the AI switch slider
        is checked. Its constantly checking if a player has won if 
        winner is not empty the method updates the feed back element
    */
    function onTick(){
        winner = game.winCheck(game.board);
        if(game.currentPlayer === ai.aiCoin && ai.isAI){
            ai.generateBestScore();
            aiPlaceElement(ai.aiCoinPos.row, ai.aiCoinPos.col);
        }
        if(winner !== ''){
            feedbackElement.text(`Winner is: ${winner}`);
            if(winner === 'tie'){
                feedbackElement.text(`You've tied, you both equally suck!`);
            }
            
            setTimeout(function(){ 
                startAi(); 
                if (!ai.isAI){
                    game.clearBoard();
                    clearBoardUI();
                    feedbackElement.text("")
                }
                winner = ""                       
            }, 1000)
            
        }
    }
})
/*
    onMouseEnterItem takes in the board position and toggles that 
    specific grid item's colour.
*/
function onMouseEnterItem(boardPosition){
    if(!isNaN(boardPosition)){
        let row = getRow(boardPosition), col = getColumn(boardPosition)
        if(game.board[row][col] === ''){
            $("#"+boardPosition).css("background-color", "#303030");
        }else{
            $("#"+boardPosition).css("background-color", "black");
        }
    }
}
/*
    startAi clears the board, sets the current player to 
    the AI coin, starts generating the best score for the ai and then
    places the coin in the generated spot.
*/
function startAi(){
    if(ai.isAI){
        feedbackElement.text("");
        game.clearBoard();
        clearBoardUI();     
        game.currentPlayer = ai.aiCoin;
        ai.generateBestScore();
        aiPlaceElement(ai.aiCoinPos.row, ai.aiCoinPos.col);
    }
}
/*
    oneVsOneGame starts the human player vs human player game 
    triggering each turn on click.
*/
function oneVsOneGame(boardPosition){
    winner = game.winCheck(game.board);    
    if(winner === ""){  
        if(!isNaN(boardPosition)) {
            game.placeCoin(getRow(boardPosition), getColumn(boardPosition), game.getTurn()) 
            placeElement(boardPosition);  
        }                                                  
        game.turn = !game.turn;                              
    }
}
/*
    aiGameOnClick starts the human vs computer game
    then all AI values are repeatedly generated in onTick.
    this method is pretty much the same as oneVsOneGame,
    except its not toggling a turn, its sending data back to
    onTick.
*/
function aiGameOnClick(boardPosition){  
    game.changeTurn('O')
    if(game.currentPlayer === playerTwo.coin){
        if(!isNaN(boardPosition)){
            let row = getRow(boardPosition), column = getColumn(boardPosition);
            if(game.board[row][column] === ''){
                winner = game.winCheck(game.board); 
                if(winner === ''){
                    game.placeCoin(getRow(boardPosition), getColumn(boardPosition), playerTwo.coin)
                    placeElement(boardPosition);
                    game.currentPlayer = ai.aiCoin;              
                }
            }  
        }
    }
}
/*
    getRow & getCol get the specified intergers from a hovered 
    grid-item. Splits each of the classes row and col and grabs
    the interger so it can be placed on the game board.
*/
function getRow(boardPos){
    console.log(boardPos)
    if(!isNaN(boardPos)){
        let cell = $("#"+boardPos);
        console.log(cell);
        return parseInt(cell.attr("class").split(' ')[1].replace(/\D/g, ""));
    }
}
function getColumn(boardPos){
    if(!isNaN(boardPos)){
        let cell = $("#"+boardPos);
        return parseInt(cell.attr("class").split(' ')[2].replace(/\D/g, ""));
    }
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
    if (itemChild < 1){
        gridItem.append(aiItem) 
    }
 }