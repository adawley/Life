(function() {
    'use strict';

    var Grid = function() {
        var self = this;

        this.elBody = document.getElementsByTagName('body')[0];
        this.elMaster = document.createElement('div');
        this.elMaster.setAttribute('class', 'grid');
        this.elBody.insertBefore(this.elMaster, this.elBody.firstChild);
        this.clickedCells = [];

        this.onClick = function(event) {
            var x = event.pageX - self.elCanvas.offsetLeft,
                y = event.pageY - self.elCanvas.offsetTop,
                cellWidth = self.cellWidth,
                cellHeight = self.cellHeight;

            // self.clickedCells.push([(x-(x%cellWidth))/cellWidth, (y-(y%cellHeight))/cellHeight]);
            window.Life.onCellClick((x-(x%cellWidth))/cellWidth, (y-(y%cellHeight))/cellHeight);
        };

        (function initCanvas() {
            self.elCanvas = document.createElement('canvas');
            self.elCanvas.width = 501;
            self.elCanvas.height = 381;
            self.cellWidth = 10;
            self.cellHeight = 10;

            self.ctx = self.elCanvas.getContext("2d");

            self.elCanvas.addEventListener('click', self.onClick, false);

            self.elMaster.appendChild(self.elCanvas);
        }());

        function initTable() {
            self.elTable = document.createElement('table');
            self.elMaster.appendChild(self.elTable);
        }
    };


    Grid.prototype.showTable = function(grid) {

        var elTable = this.elTable,
            elCell, elRow,
            cellVal,
            numRows = grid.length,
            numCols = grid[0].length;

        while (elTable.firstChild) {
            elTable.removeChild(elTable.firstChild);
        }

        for (var row = 0; row < numRows; row++) {

            elRow = document.createElement('tr');

            for (var col = 0; col < numCols; col++) {
                cellVal = grid[row][col];

                elCell = document.createElement('td');

                if (cellVal === 1) {
                    elCell.setAttribute('class', 'bg-black');
                }

                elCell.innerHTML = "&nbsp;&nbsp;";

                elRow.appendChild(elCell);
            }

            elTable.appendChild(elRow);
        }
    };

    Grid.prototype.showCanvas = function(grid) {
        var cellWidth = this.cellWidth || 10,
            cellHeight = this.cellHeight || 10,
            numRows = grid.length,
            numCols = grid[0].length,
            gridWidth = numCols * cellWidth,
            gridHeight = numRows * cellHeight;

        this.numRows = numRows;
        this.numCols = numCols;

        // adjust the canvas size
        this.elCanvas.width = gridWidth + 1;
        this.elCanvas.height = gridHeight + 1;

        this.updateCanvas(grid);
    };

    Grid.prototype.updateCanvas = function(grid) {
        var cellVal, x, y, row, col,
            ctx = this.ctx,
            cellWidth = this.cellWidth,
            cellHeight = this.cellHeight,
            gridWidth = this.elCanvas.width,
            gridHeight = this.elCanvas.height,
            tmpPoint, tx, ty;

        // vertical lines
        for (x = 0.5; x < gridWidth + 1; x += cellWidth) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, gridHeight);
        }

        // horizontal lines
        for (y = 0.5; y < gridHeight + 1; y += cellHeight) {
            ctx.moveTo(0, y);
            ctx.lineTo(gridWidth - 1, y);
        }

        // points

        // check for new points added from clicks
        while( (tmpPoint = this.clickedCells.pop()) ){
            tx = tmpPoint[0];
            ty = tmpPoint[1];

            grid[ty][tx] = 1;
        }

        for (row = 0; row < this.numRows; row++) {

            for (col = 0; col < this.numCols; col++) {
                cellVal = grid[row][col];

                if (cellVal === 1) {
                    ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
                } else {
                    ctx.clearRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
                }

            }

        }

        // draw the lines last so that they cut the points
        ctx.strokeStyle = "#ddd";
        ctx.stroke();
    };

    Grid.prototype.show = function(grid) {
        // this.showTable(grid);
        this.showCanvas(grid);
    };

    Grid.prototype.update = function(grid) {
        this.updateCanvas(grid);
    };


    window.Grid = new Grid();
}());