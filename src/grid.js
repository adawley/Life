(function() {
    'use strict';

    var Grid = function() {
        var self = this;

        this.elBody = document.getElementsByTagName('body')[0];
        this.elMaster = document.createElement('div');
        this.elTable = document.createElement('table');
        this.elCanvas = document.createElement('canvas');
        this.elCanvas.width = 501;
        this.elCanvas.height = 381;

        this.ctx = this.elCanvas.getContext("2d");

        this.elMaster.setAttribute('class', 'grid');

        this.elBody.insertBefore(this.elMaster, this.elBody.firstChild);
        // this.elMaster.appendChild(this.elTable);
        this.elMaster.appendChild(this.elCanvas);
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
        var ctx = this.ctx,
            cellWidth = 10,
            cellHeight = 10,
            numRows = grid.length,
            numCols = grid[0].length,
            gridWidth = numCols * cellWidth,
            gridHeight = numRows * cellHeight,
            cellVal;

        // vertical lines
        for (var x = 0.5; x < gridWidth; x += cellWidth) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, gridHeight);
        }

        // horizontal lines
        for (var y = 0.5; y < gridHeight; y += cellHeight) {
            ctx.moveTo(0, y);
            ctx.lineTo(gridWidth-1, y);
        }

        // points
        for (var row = 0; row < numRows; row++) {

            for (var col = 0; col < numCols; col++) {
                cellVal = grid[row][col];

                if (cellVal === 1) {
                    ctx.fillRect(col*cellWidth, row*cellHeight, 10, 10);
                } else {
                    ctx.clearRect(col*cellWidth, row*cellHeight, 10, 10);
                }

            }

        }
        

        ctx.strokeStyle = "#ddd";
        ctx.stroke();
    };

    Grid.prototype.show = function(grid) {
        // this.showTable(grid);
        this.showCanvas(grid);
    };

    window.Grid = new Grid();

    setTimeout(function() {
        var grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        window.Grid.show(grid);
    }, 10);
}());