playerOne.isPlayerOneTurn = true;

$(function(){
    let boardPos; 
    makeGrid();
    $(".grid-item").on("click", function(){
        placeElement(boardPos);
    })
    $(".grid-item").on("mouseover", function(e){     
        console.log("HI") 
        boardPos = e.target.id;
        console.log(boardPos)
    })
})
function makeGrid(rows = 3, cols = 3){
    let i = 0;
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {           
            i++;
            let cell = $(`<div class="grid-item" id="${i}"></div>`);
            cell.css({left : x + "px", top : y +'px'});
            $("#game-container").append(cell);
        }       
    }
}
function placeElement(boardPos){
    let gridItem = $(`#${boardPos}`);
    let playerItem = game.getTurn() ? '<img id="player-one" src="assets/X.png"/>' : ' <img id="player-two" src="assets/O.png"/>';
    gridItem.append(playerItem);
}