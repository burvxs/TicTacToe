/*
    Ben Purvis 
    GA_SEi37
    7/24/2020
    GameLogic javascript file containing the player, game and ai objects.
    The UI and game logic are completely seperated from each other.
*/


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
    isBoardEmpty : false,

    /* 
        Takes three board positions as parameters and compares 
        each location.
    */ 
    positionCheck : function(positionOne, positionTwo, positionThree){
        return positionOne === positionTwo && positionTwo === positionThree && positionOne != '';
    },
    winCheck : function(board){
        let winner = "";
        // horizontal, rows
        for (let rows = 0; rows < this.WIN_ON; rows++) {
            if(this.positionCheck(board[rows][0], board[rows][1], board[rows][2])){
                winner = board[rows][0];
            }
        }
        // vertical, columns
        for (let cols = 0; cols < this.WIN_ON; cols++){
            if(this.positionCheck(board[0][cols], board[1][cols], board[2][cols])){
                winner = board[0][cols];
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
        this.isBoardEmpty = true;
    },
    getTurn : function(){
        let coin
        this.turn ? coin = playerOne.coin : coin = playerTwo.coin;
        return coin;
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
    /*
        isAI is toggled when the user selects to change games.
        All AI logic will run when isAI is set to true.
    */
    isAI : false,
    aiCoin : 'X',
    // AI coin positions that are passed to the UI for placement.
    aiCoinPos : {row : 0, col : 0},
    /*
        Heuristic function or evalulation function.
        If the maximizing player (AI) wins the score is +10.
        If the minimizing player (Person) wins the score is -10.
        Calculates the value of the board depending on the placement
        of coins on the board
    */
    heuristic : function(board){
        // vertical, checking rows
        for (let rows = 0; rows < board.length; rows++) {
            if(game.positionCheck(board[rows][0], board[rows][1], board[rows][2])){
                if(board[rows][0] === ai.aiCoin){
                    return +10;
                }else if(board[rows][0] === playerTwo.coin){
                    return -10;
                }
            }
        }
        // horizontal, checking columns
        for (let cols = 0; cols < board.length; cols++) {
            if(game.positionCheck(board[0][cols], board[1][cols], board[2][cols])){
                if(board[cols][0] === ai.aiCoin){
                    return +10;
                }else if(board[cols][0] === playerTwo.coin){
                    return -10;
                }
            }
        }
        // diagonal top-left to bottom-right
        if(game.positionCheck(board[0][0], board[1][1], board[2][2])){
            if(board[0][0] === ai.aiCoin){
                return +10;
            }else if(board[0][0] === playerTwo.coin){
                return -10;
            }
        }
        // diagonal top-right to bottom-left
        if(game.positionCheck(board[0][2], board[1][1], board[2][0])){
            if(board[0][2] === ai.aiCoin){
                return +10;
            }else if(board[0][2] === playerTwo.coin){
                return -10;
            }
        }
        return 0;
    },
    /*
        Checks if theres any moves left on the board
    */
    isMovesLeft : function (){  
        for (let rows = 0; rows < game.board.length; rows++) {
            let newBoard = game.board[rows]
            for (let cols = 0; cols < newBoard.length; cols++) {
                    if(game.board[rows][cols] === ''){
                        return true
                    }else{
                        return false;
                    }
            }
        }
    },
    /*
        MiniMax Algorithm
        The maximizer = AI.
        The minimizer = player.

        The maximizer tries to get the highest score possible while the
        minimizer does the opposite, getting lowest score. 
        Every board state has a value associated with it. In a state where the
        maximizer has an advantage the score of the board positive value, if the 
        minimizer can win in that board state, the score is a negative value.

        This method recursively calls it self on the max and min player scanning the 
        board locations and creating a score for each player (minimizing, maximizing) based
        on the board state.
    */
    minimax : function (board, depth, isMaximizing) {
        let score = this.heuristic(board);
        if(score === 10){
            return score;
        }
        if(score === -10){
            return score;
        }
        if (!this.isMovesLeft(board)){
            return 0;
        }

        if(isMaximizing){
            let maxBestScore = -Infinity;
            for (let rows = 0; rows < board.length; rows++) {
                let newBoard = board[rows]
                for (let cols = 0; cols < newBoard.length; cols++) {
                    if(board[rows][cols] === ''){
                        board[rows][cols] = this.aiCoin;
                        let evalScore = this.minimax(board, depth + 1, false)                    
                        maxBestScore = Math.max(maxBestScore, evalScore);
                        board[rows][cols] = '';
                    }  
                }
            }
            return maxBestScore;
        }else{
            let minScore = Infinity;
            for (let rows = 0; rows < board.length; rows++) {
                let newBoard = board[rows]
                for (let cols = 0; cols < newBoard.length; cols++) {
                    if(board[rows][cols] === ''){
                        board[rows][cols] = playerTwo.coin;
                        let evalScore = this.minimax(board, depth + 1, true)                  
                        minScore = Math.min(evalScore, minScore)
                        board[rows][cols] = ''
                    }  
                }
            }
            return minScore;
        }     
    },
    /*
        Finds the best move similarly to the minimax method
        except this calls minimax and generates the best 
        move for the computer to take. If the minimaxScore
        is greater than the the bestScore than the minimax method
        has found a better move then the minimizing player.
        Also passes the best move to the aiCoinPos sub object
        so the UI can update.
    */
    generateBestScore : function(){
        let bestScore = -Infinity;
        let move = {rows : 0, cols : 0};
        for (let rows = 0; rows < game.board.length; rows++) {
            let newBoard = game.board[rows]
            for (let cols = 0; cols < newBoard.length; cols++) {
                if(game.board[rows][cols] === ''){
                    game.board[rows][cols] = this.aiCoin;
                    let minimaxScore = this.minimax(game.board, 0, false);
                    game.board[rows][cols] = ''
                    if (minimaxScore > bestScore){
                        bestScore = minimaxScore
                        move = {rows, cols}
                    }
                }
            }
        }
        this.aiCoinPos.row = move.rows;
        this.aiCoinPos.col = move.cols 
        game.placeCoin(move.rows, move.cols, this.aiCoin);
        game.currentPlayer = playerTwo.coin;
    }
}