document.addEventListener('DOMContentLoaded', () => {
    // Game state variables
    let currentPlayer = 'x';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    // DOM elements
    const turnDisplay = document.getElementById('turnDisplay');
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('resetBtn');
    
    // Initialize the game
    initGame();
    
    function initGame() {
        // Add event listeners to each cell
        cells.forEach(cell => {
            cell.addEventListener('click', () => handleCellClick(cell));
        });
        
        // Reset button event listener
        resetBtn.addEventListener('click', resetGame);
    }
    
    function handleCellClick(cell) {
        const index = parseInt(cell.dataset.index);
        
        // Check if cell is empty and game is active
        if (gameState[index] !== '' || !gameActive) return;
        
        makeMove(cell, index, currentPlayer);
        checkGameStatus();
    }
    
    function makeMove(cell, index, symbol) {
        gameState[index] = symbol;
        cell.textContent = symbol.toUpperCase();
        cell.classList.add(symbol);
    }
    
    function checkGameStatus() {
        // Check for win
        const winResult = checkWin();
        if (winResult.winner) {
            gameActive = false;
            turnDisplay.textContent = `Player ${winResult.winner.toUpperCase()} Wins!`;
            highlightWinningCells(winResult.winningCells);
            return;
        }
        
        // Check for draw
        if (checkDraw()) {
            gameActive = false;
            turnDisplay.textContent = "Game Draw!";
            return;
        }
        
        // Switch turns
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        updateTurnDisplay();
    }
    
    function updateTurnDisplay() {
        turnDisplay.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
    }
    
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (gameState[a] !== '' && 
                gameState[a] === gameState[b] && 
                gameState[a] === gameState[c]) {
                return {
                    winner: gameState[a],
                    winningCells: condition
                };
            }
        }
        
        return { winner: null, winningCells: [] };
    }
    
    function highlightWinningCells(cellIndices) {
        cellIndices.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }
    
    function checkDraw() {
        return !gameState.includes('');
    }
    
    function resetGame() {
        currentPlayer = 'x';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        
        // Clear the board
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        updateTurnDisplay();
    }
});