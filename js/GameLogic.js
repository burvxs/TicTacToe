
const playerTwo = {
    coin : "O",
    isPlayerTwoTurn : false,
    placeCoin : function(board, row, column){
        board[row][column] = this.coin
        return board
    }
}

const playerOne = {
    coin : 'X',
    isPlayerOneTurn : false,
    placeCoin : function(board, row, column){
        board[row][column] = this.coin;
        return board;
    }
}

const game = {
    board : [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    WIN_ON : 3,
    positionCheck : function(positionOne, positionTwo, positionThree){
        return positionOne === positionTwo && positionTwo === positionThree && positionOne != '';
    },
    winCheck : function(board){
        let winner = "";
        // horizontal
        for (let i = 0; i < this.WIN_ON; i++) {
            if(this.positionCheck(board[i][0], board[i][1], board[i][2])){
                winner = board[i][0];
            }
        }
        // vertical
        for (let i = 0; i < this.WIN_ON; i++){
            if(this.positionCheck(board[0][i], board[1][i], board[2][i])){
                winner = board[0][i];
            }
        }
        // diagonal top-left to bottom-right
        if(this.positionCheck(board[0][0], board[1][1], board[2][2])){
            winner = board[0][0]
        }
        // diagonal top-right to bottom-left
        if(this.positionCheck(board[0][2], board[1][1], board[2][0])){
            winner = board[0][2]
        }
        if(winner === ""){
            return "tie"
        }
        return winner;
    },
    getTurn : function(){
        if(playerOne.isPlayerOneTurn){
            return true
        }else if (playerTwo.isPlayerTwoTurn){
            return false
        }
    },
    changeTurn : function(){
        !playerOne.isPlayerOneTurn ? playerTwo.isPlayerTwoTurn = true : playerOne.isPlayerOneTurn = true;
    }
}
console.log(game.winCheck(game.board));




