(function(_) {

    'use strict';


    var grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


    var Deaths = {
        underPopulation: function(neighbourCount) {

            // any live cell with fewer than two live neighbours dies
            return (neighbourCount > 1) ? 1 : 0;
        },

        overcrowding: function(neighbourCount) {

            // any live cell with more than three live neighbours dies
            return (neighbourCount > 3) ? 0 : 1;
        },

        livingCount: function(neighbours){
            var liveNeighbourCount = 0;

            _.each(neighbours, function(cell){
                // TODO(rob): optimize this to stop when liveNeighbourCount > 1
                if(cell.val === 1){
                    liveNeighbourCount++;
                }
            });

            return liveNeighbourCount;
        },

        test: function(neighbours){
            var count = Deaths.livingCount(neighbours),
                underpop = Deaths.underPopulation(count),
                overcrow = Deaths.overcrowding(count);

            console.log(count, underpop, overcrow); //XXX

            return underpop && overcrow;
        },

        calculate: function(grid) {
            var y = 0,
                x = 0,
                rowCount = grid.length,
                colCount = grid[0].length,
                newGrid = [],
                neighbours;

            for (; y < rowCount; y++) {
                for (x = 0; x < colCount; x++) {
                    neighbours = Life.util.getNeighbours(grid, x, y);

                    newGrid[y][x] = Deaths.test(neighbours);
                }
            }
        }

    };

    var Survival = {

        nextGeneration: function() {
            // any live cell with two or three live neighbours lives
        }

    };

    var Births = {
        reproduction: function() {
            // any dead cell with exactly three live neighbours becomes a live cell
        },
        calculate: function(grid) {}
    };

    function generation(grid) {

        Deaths.calculate(grid);

        Births.calculate(grid);



    }



    window.startLife = function() {
        console.log('Starting...'); //XXX

        // generation(grid);

        // Life.util.showGrid(grid);
        var n = Life.util.getNeighbours(grid, 4, 4);
        var ret = Deaths.test(n);
        console.log(ret); //XXX

        n = Life.util.getNeighbours(grid, 4,5);

        ret = Deaths.test(n);
        console.log(ret); //XXX
    };

}(window._));

(function(_) {
    'use strict';

    var Life = {
        util: {
            pad: function(pad, str, padLeft) {
                if (str === undefined) {
                    return pad;
                }
                if (padLeft) {
                    return (pad + str).slice(-pad.length);
                } else {
                    return (str + pad).substring(0, pad.length);
                }
            },

            getCell: function(grid, x, y) {
                // TODO(rob): handle negative x or y case
                return grid[y][x];
            },

            getNeighbourCoordinates: function(gridWidth, gridHeight, cellX, cellY) {
                var X = cellX,
                    Y = cellY,
                    back = X - 1,
                    up = Y - 1,
                    down = Y + 1,
                    forw = X + 1,

                    // clockwise, starting at noon
                    ret = {

                        n: {
                            x: X,
                            y: up
                        },
                        ne: {
                            x: forw,
                            y: up
                        },
                        e: {
                            x: forw,
                            y: Y
                        },
                        se: {
                            x: forw,
                            y: down
                        },

                        s: {
                            x: X,
                            y: down
                        },
                        sw: {
                            x: back,
                            y: down
                        },
                        w: {
                            x: back,
                            y: Y
                        },
                        nw: {
                            x: back,
                            y: up
                        }

                    };

                return ret;

            },

            getNeighbours: function(grid, cellX, cellY) {
                var colCount = grid[0].length,
                    rowCount = grid.length,
                    neighbours; // coordinates

                neighbours = Life.util.getNeighbourCoordinates(colCount, rowCount, cellX, cellY);

                _.each(neighbours, function(coor) {
                    coor.val = Life.util.getCell(grid, coor.x, coor.y);
                });

                return neighbours;
            },

            showGrid: function(grid) {
                grid.forEach(function(row, index) {
                    var rowNum = Life.util.pad('00', index, true);

                    console.log(rowNum, row.join('')); //XXX

                });
            }
        }
    };

    window.Life = Life;
}(window._));


window.startLife();