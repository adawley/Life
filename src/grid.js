(function() {
    'use strict';

    var Grid = function() {
        var self = this;

        this.elBody = document.getElementsByTagName('body')[0];
        this.elMaster = document.createElement('div');

        this.elMaster.setAttribute('class', 'grid');

        this.elBody.insertBefore(this.elMaster, this.elBody.firstChild);
    };

    Grid.prototype.show = function(grid) {

        var elCell, elRow, elTable = document.createElement('table'),
            cellVal,
            numRows = grid.length,
            numCols = grid[0].length;

        this.elCurrentTable = elTable;

        for (var row = 0; row < numRows; row++) {

            elRow = document.createElement('tr');

            for (var col = 0; col < numCols; col++) {
                cellVal = grid[row][col];

                elCell = document.createElement('td');

                if(cellVal === 1){
                    elCell.setAttribute('class', 'bg-black');
                }

                elCell.innerHTML = "&nbsp;&nbsp;";

                elRow.appendChild(elCell);
            }

            elTable.appendChild(elRow);
        }

        while (this.elMaster.firstChild) {
          this.elMaster.removeChild(this.elMaster.firstChild);
        }

        this.elMaster.appendChild(elTable);


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