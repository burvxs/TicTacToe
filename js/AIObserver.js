
const targetNodes = $(".grid-item");
const config = {attributes : true, childList : true, subtree : true}

const observer = new MutationObserver(function(mutationRecord){
    for (let mutation of mutationRecord){
        if (mutation.type === 'childList'){
            // Human player has placed a coin
            if(!game.turn){
                ai.generateScore(game.board)
                console.log(ai.aiCoinPos.row, ai.aiCoinPos.col);
                aiPlaceElement(ai.aiCoinPos.row, ai.aiCoinPos.col);
                game.turn = game.changeTurn()
            }
        }          
    }
})

observer.observe(document, config)

