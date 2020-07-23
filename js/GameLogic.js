
const playerTwo = {
    coin : "O",
}

const playerOne = {
    coin : 'X',
}

const game = {
    board : [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    WIN_ON : 3,
    turn : false,
    currentPlayer : playerTwo.coin,

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
        if(winner === "" && this.isBoardFull()){
            return "tie"
        }else{
            return winner;
        }   
    },
    isBoardFull : function () {
        let counter = 0;
        let isFull = false
        for (let x = 0; x < this.board.length; x++) {
            const boardCols = this.board[x]     
            for (let y = 0; y < boardCols.length; y++) {       
                if(this.board[x][y] === '' || null){           
                    counter++;
                }
                if(counter === 0){
                    isFull = true;
                }else{
                    isFull = false;
                }  
            }
        }
        return isFull;
    },
    clearBoard : function (){
        for (let x = 0; x < this.board.length; x++) {
            const boardCols = this.board[x]     
            for (let y = 0; y < boardCols.length; y++){
                this.board[x][y] = '';
            }
        }
    },
    getTurn : function(){
        let coin
        this.turn ? coin = playerOne.coin : coin = playerTwo.coin;
        return coin;
    },
    getAiTurn : function(){
        let coin = this.currentPlayer;
        if (coin === ai.aiCoin){
            return coin
        }else{
            return coin
        }
    },
    changeTurn : function(){
        this.turn = !this.turn
        return this.turn;
    },
    changeTurn : function (playerChar) {  
        if(playerChar === "X"){
            this.turn = true;
        }else if (playerChar === 'O'){
            this.turn = false;
        }
        return this.turn;
    },
    placeCoin : function(row, column){
        this.board[row][column] = this.getTurn();
        return this.board;
    },
    placeCoin : function(row, column, coin){
        if(this.board[row][column] === ''){
            this.board[row][column] = coin;
            this.currentPlayer = coin;
        }  
        return this.board;
    },
}
const ai = {
    isAI : false,
    aiCoin : 'X',
    scores : {
        X : 1,
        O : -1,
        Tie : 0
    },
    aiCoinPos : {row : 0, col : 0},
    minimax : function (board, depth, isMaximizing) {
        if(game.winCheck(board) !== ""){
            return this.scores[game.winCheck(board)]
        }
        if(isMaximizing){
            let maxScore = -Infinity;
            for (let rows = 0; rows < board.length; rows++) {
                let newBoard = board[rows]
                for (let cols = 0; cols < newBoard.length; cols++) {
                    if(board[rows][cols] === ''){
                        board[rows][cols] = this.aiCoin;
                        let evalScore = this.minimax(board, depth + 1, false)
                        board[rows][cols] = '';
                        maxScore = Math.max(evalScore, maxScore);
                    }  
                }
            }
            return maxScore;
        }else{
            let minScore = Infinity;
            for (let rows = 0; rows < board.length; rows++) {
                let newBoard = board[rows]
                for (let cols = 0; cols < newBoard.length; cols++) {
                    if(board[rows][cols] === ''){
                        board[rows][cols] = playerTwo.coin;
                        let evalScore = this.minimax(board, depth + 1, true)
                        board[rows][cols] = ''
                        minScore = Math.min(evalScore, minScore)
                    }  
                }
            }
            return minScore;
        }     
    },
    getAICoins : function(board){
        let coinPositions = {}
        for (let rows = 0; rows < board.length; rows++) {
            const newBoard = board[rows]
            for (let cols = 0; cols < newBoard.length; cols++) {
                if(board[rows][cols] === this.aiCoin){
                    coinPositions ={
                        row : rows,
                        column : cols
                    }
                }
            }
        }
        return coinPositions;
    },
    generateScore : function(){
        let aiScore = -Infinity;
        let move = {rows : 0, cols : 0};
        for (let rows = 0; rows < game.board.length; rows++) {
            let newBoard = game.board[rows]
            for (let cols = 0; cols < newBoard.length; cols++) {
                if(game.board[rows][cols] === ''){
                    game.board[rows][cols] = this.aiCoin;
                    let minimaxScore = this.minimax(game.board, 10, false);
                    game.board[rows][cols] = ''
                    if (minimaxScore > aiScore){
                        aiScore = minimaxScore
                        move = {rows, cols}
                    }
                }
            }
        }
        this.aiCoinPos.row = move.rows;
        this.aiCoinPos.col = move.cols 
        console.log(move)  
        game.placeCoin(move.rows, move.cols, this.aiCoin);
        game.currentPlayer = playerTwo.coin;
    }
}




