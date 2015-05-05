(function(_) {

    'use strict';


    var gridz = [
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


    var Deaths = {
        underPopulation: function(cell) {
            var isAlive = cell.val === 1,
                lessThan2LiveNeighbours = cell.liveNeighbourCount < 2;

            // any live cell with fewer than two live neighbours dies
            return (isAlive && lessThan2LiveNeighbours === false) ? 1 : 0;
        },

        overcrowding: function(cell) {
            var isAlive = cell.val === 1,
                moreThan3LiveNeighbours = cell.liveNeighbourCount > 3;

            // any live cell with more than three live neighbours dies
            return (isAlive && moreThan3LiveNeighbours === false) ? 1 : 0;
        },

        test: function(cell) {
            var underpop = Deaths.underPopulation(cell),
                overcrow = Deaths.overcrowding(cell);

            return (underpop === 0 || overcrow === 0) ? 0 : 1;
        },

        calculate: function(grid) {
            var newGrid = [];

            Life.util.iterateGrid(grid, function(cell) {
                newGrid[cell.y] = newGrid[cell.y] || [];
                newGrid[cell.y][cell.x] = Deaths.test(cell);
            });

            return newGrid;
        }

    };

    var Survivals = {

        nextGeneration: function(cell) {
            // any live cell with two or three live neighbours lives

            var isAlive = cell.val === 1,
                has2or3LiveNeighbours = cell.liveNeighbourCount === 2 || cell.liveNeighbourCount === 3;

            return (isAlive && has2or3LiveNeighbours) ? 1 : 0;
        },

        test: function(cell) {
            return Survivals.nextGeneration(cell);
        },

        calculate: function(grid) {
            var newGrid = [];

            Life.util.iterateGrid(grid, function(cell) {
                newGrid[cell.y] = newGrid[cell.y] || [];
                newGrid[cell.y][cell.x] = Survivals.test(cell);
            });

            return newGrid;
        }

    };

    var Births = {

        reproduction: function(cell) {
            // any dead cell with exactly three live neighbours becomes a live cell
            var isDead = cell.val === 0,
                has3LiveNeighbours = cell.liveNeighbourCount === 3;

            return (isDead && has3LiveNeighbours) ? 1 : 0;
        },

        test: function(cell) {
            return Births.reproduction(cell);
        },

        calculate: function(grid) {
            var newGrid = [];

            Life.util.iterateGrid(grid, function(cell) {
                newGrid[cell.y] = newGrid[cell.y] || [];
                newGrid[cell.y][cell.x] = Births.test(cell);
            });

            return newGrid;
        }
    };

    var Generations = {

        nextGeneration: function(cell) {
            var death = Deaths.test(cell),
                survival = Survivals.test(cell),
                birth = Births.test(cell);

            return (death || survival || birth);
        },

        test: function(cell) {
            return Generations.nextGeneration(cell);
        },

        calculate: function(grid) {
            var newGrid = [];

            Life.util.iterateGrid(grid, function(cell) {
                newGrid[cell.y] = newGrid[cell.y] || [];
                newGrid[cell.y][cell.x] = Generations.test(cell);
            });

            return newGrid;
        }
    };

    function generation(grid) {

        var deaths = Deaths.calculate(grid),
            survivals = Survivals.calculate(grid),
            births = Births.calculate(grid);

        var x=0, xSize=grid[0].length,
            y=0, ySize=grid.length,
            newGrid = [];

        for (; y < ySize; y++) {
            for (x = 0; x < xSize; x++) {
                newGrid[y] = newGrid[y] || [];
                newGrid[y][x] = deaths[y][x] || survivals[y][x] || births[y][x];
            }
        }

        return newGrid;

        /*
        console.log('------------'); //XXX
        Life.util.showGrid(Deaths.calculate(grid));
        console.log('------------'); //XXX
        Life.util.showGrid(Survivals.calculate(grid));
        console.log('------------'); //XXX
        Life.util.showGrid(Births.calculate(grid));
        */
    }

    //
    //
    //
    //
    window.startLife = function() {
        console.log('Starting...'); //XXX

        var grid = unitTests.testBlink1(),
            iter1 = generation(grid),
            iter2 = generation(iter1);

        Life.util.showGrid(grid);
        console.log('------------'); //XXX
        Life.util.showGrid(iter1);
        console.log('------------'); //XXX
        Life.util.showGrid(iter2);
    };

    var unitTests = {

        testDie1: function(){
            return [
                [0,0,0,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0],
                [0,0,1,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ];
        },

        testDie2: function(){
            return [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,1,0,0],
                [0,1,0,1,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ];
        },

        testDie3: function(){
            return [
                [0,0,0,0,0],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,1,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ];
        },  

        testBlink1: function(){
            return [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ];
        },        


        test1: function() {
            var cell, death, survival, birth;

            cell = new Cell(grid, 4, 4);
            death = Deaths.test(cell);
            survival = Survivals.test(cell);
            birth = Births.test(cell);
            console.log(
                ' Initial: ', cell.val,
                ' Death: ', death,
                ' Survival: ', survival,
                ' Birth: ', birth,
                ' Next Gen: ', Generations.test(cell)
            );

            cell = new Cell(grid, 4, 5);
            death = Deaths.test(cell);
            survival = Survivals.test(cell);
            birth = Births.test(cell);
            console.log(
                ' Initial: ', cell.val,
                ' Death: ', death,
                ' Survival: ', survival,
                ' Birth: ', birth,
                ' Next Gen: ', Generations.test(cell)
            );
        }

    };

    //
    //
    //
    //
    var Cell = function(grid, x, y) {
        var coordinates = Life.util.getInfiniteCoordinates(grid[0].length, grid.length, {x:x, y:y});

        // absolute coordinates (i.e. negative values)
        this.x = coordinates.x;
        this.y = coordinates.y;

        // relative coordinates (i.e. wrapped infinite plane)
        this.X = coordinates.X;
        this.Y = coordinates.Y;

        this.val = Life.util.getCell(grid, this.X, this.Y);
        this.neighbours = Life.util.getNeighbours(grid, this.X, this.Y);
        this.liveNeighbourCount = Life.util.getLivingNeighbourCount(this.neighbours);
    };

    //
    //
    //
    //
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

            generateGrid: function(xSize, ySize, liveCells){
                var x=0,
                    y=0,
                    grid = [];

                for (; y < ySize; y++) {
                    for (x = 0; x < xSize; x++) {
                        grid[y] = grid[y] || [];
                        grid[y][x] = 0;
                    }
                }

                liveCells.forEach(function(coor){
                    if(coor.x > xSize){
                        console.log('x coordinate too big: ', coor.x); //XXX
                    }
                    if(coor.y > ySize){
                        console.log('y coordinate too big: ', coor.y); //XXX
                    }

                    grid[coor.y][coor.x] = 1;
                });

                return grid;
            },

            getCell: function(grid, x, y) {
                return grid[y][x];
            },

            getInfiniteCoordinates: function(xSize, ySize, coordinates) {
                // wrap the coordinates so as to simulate an infinate plane
                var x = coordinates.x,
                    y = coordinates.y,

                    y1 = (y < 0) ? ySize + y : y,
                    Y = (y1 >= ySize) ? 0 : y1,

                    x1 = (x < 0) ? xSize + x : x,
                    X = (x1 >= xSize) ? 0 : x1;

                return {
                    x: x,
                    X: X,
                    y: y,
                    Y: Y
                };
            },

            getLivingNeighbourCount: function(neighbours) {
                var liveNeighbourCount = 0;

                _.each(neighbours, function(cell) {
                    if (cell.val === 1) {
                        liveNeighbourCount++;
                    }
                });

                return liveNeighbourCount;
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

                        n: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: X,
                            y: up
                        }),

                        ne: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: forw,
                            y: up
                        }),

                        e: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: forw,
                            y: Y
                        }),

                        se: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: forw,
                            y: down
                        }),

                        s: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: X,
                            y: down
                        }),

                        sw: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: back,
                            y: down
                        }),

                        w: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: back,
                            y: Y
                        }),

                        nw: Life.util.getInfiniteCoordinates(gridWidth, gridHeight, {
                            x: back,
                            y: up
                        })

                    };

                return ret;

            },

            getNeighbours: function(grid, cellX, cellY) {
                var colCount = grid[0].length,
                    rowCount = grid.length,
                    neighbours; // coordinates

                neighbours = Life.util.getNeighbourCoordinates(colCount, rowCount, cellX, cellY);

                _.each(neighbours, function(coor) {
                    coor.val = Life.util.getCell(grid, coor.X, coor.Y);
                });

                return neighbours;
            },

            iterateGrid: function(grid, fn) {
                var y = 0,
                    x = 0,
                    rowCount = grid.length,
                    colCount = grid[0].length,
                    cell;

                for (; y < rowCount; y++) {
                    for (x = 0; x < colCount; x++) {
                        cell = new Cell(grid, x, y);
                        fn(cell);
                    }
                }
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