class GameOfLife {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isRunning = false;
        this.animationId = null;
        
        // Brighter pastel colors for dark theme
        this.colors = [
            '#FF9AA2', // Pastel Red
            '#FFB7B2', // Pastel Coral
            '#FFDAC1', // Pastel Orange
            '#E2F0CB', // Pastel Green
            '#B5EAD7', // Pastel Mint
            '#C7CEEA', // Pastel Blue
            '#E8E8FF', // Pastel Lavender
            '#FFB8DE'  // Pastel Pink
        ];
        
        this.setupCanvas();
        this.setupEventListeners();
        this.initializeGrid();
    }

    setupCanvas() {
        // Set canvas to window size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Calculate cell size based on screen size
        // Aim for approximately 50-70 cells across the width
        const targetCells = window.innerWidth > 1920 ? 70 : 50;
        this.cellSize = Math.floor(window.innerWidth / targetCells);
        
        // Calculate grid dimensions
        this.cols = Math.floor(this.canvas.width / this.cellSize);
        this.rows = Math.floor(this.canvas.height / this.cellSize);
        
        // Center the grid
        this.offsetX = (this.canvas.width - (this.cols * this.cellSize)) / 2;
        this.offsetY = (this.canvas.height - (this.rows * this.cellSize)) / 2;
        
        // Update grid if it exists
        if (this.grid) {
            const oldGrid = this.grid;
            this.initializeGrid();
            
            // Copy existing pattern to new grid if possible
            const minRows = Math.min(oldGrid.length, this.rows);
            const minCols = Math.min(oldGrid[0].length, this.cols);
            
            for (let i = 0; i < minRows; i++) {
                for (let j = 0; j < minCols; j++) {
                    this.grid[i][j] = oldGrid[i][j];
                }
            }
        }
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('pattern').addEventListener('change', (e) => this.setPattern(e.target.value));
        
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - this.offsetX;
            const y = e.clientY - rect.top - this.offsetY;
            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);
            this.toggleCell(row, col);
        });

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.setupCanvas();
                this.draw();
            }, 250);
        });
    }

    initializeGrid() {
        this.grid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        this.nextGrid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    setPattern(pattern) {
        this.grid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        const centerRow = Math.floor(this.rows / 2);
        const centerCol = Math.floor(this.cols / 2);

        switch(pattern) {
            case 'random':
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.grid[i][j] = Math.random() > 0.85 ? Math.floor(Math.random() * this.colors.length) + 1 : 0;
                    }
                }
                break;
            case 'glider':
                const glider = [
                    [0, 1, 0],
                    [0, 0, 1],
                    [1, 1, 1]
                ];
                this.applyPattern(glider, centerRow - 1, centerCol - 1);
                break;
            case 'blinker':
                const blinker = [
                    [1, 1, 1]
                ];
                this.applyPattern(blinker, centerRow, centerCol - 1);
                break;
            case 'beacon':
                const beacon = [
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1]
                ];
                this.applyPattern(beacon, centerRow - 2, centerCol - 2);
                break;
        }
        this.draw();
    }

    applyPattern(pattern, startRow, startCol) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[0].length; j++) {
                if (pattern[i][j]) {
                    this.grid[startRow + i][startCol + j] = 
                        Math.floor(Math.random() * this.colors.length) + 1;
                }
            }
        }
    }

    toggleCell(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.grid[row][col] = (this.grid[row][col] + 1) % (this.colors.length + 1);
            this.draw();
        }
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                    if (this.grid[newRow][newCol] > 0) count++;
                }
            }
        }
        return count;
    }

    update() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const neighbors = this.countNeighbors(i, j);
                const currentState = this.grid[i][j];
                
                if (currentState > 0) {
                    if (neighbors < 2 || neighbors > 3) {
                        this.nextGrid[i][j] = 0;
                    } else {
                        this.nextGrid[i][j] = currentState;
                    }
                } else {
                    if (neighbors === 3) {
                        this.nextGrid[i][j] = Math.floor(Math.random() * this.colors.length) + 1;
                    } else {
                        this.nextGrid[i][j] = 0;
                    }
                }
            }
        }
        
        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid background
        this.ctx.fillStyle = '#1E1E1E';
        this.ctx.fillRect(this.offsetX, this.offsetY, 
            this.cols * this.cellSize, this.rows * this.cellSize);
        
        // Draw cells
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] > 0) {
                    this.ctx.fillStyle = this.colors[this.grid[i][j] - 1];
                    this.ctx.fillRect(
                        j * this.cellSize + this.offsetX,
                        i * this.cellSize + this.offsetY,
                        this.cellSize - 1,
                        this.cellSize - 1
                    );
                }
            }
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }

    pause() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    reset() {
        this.pause();
        this.initializeGrid();
        this.draw();
    }

    animate() {
        this.update();
        this.draw();
        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new GameOfLife();
}); 