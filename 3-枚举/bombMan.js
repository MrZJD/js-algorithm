var myCons = require('../console-read/demo1');

var MAP_SIZE = 13;
myCons.scanfLines(function(chunk){
	// console.log(chunk);
	var result = [];
	for(var i=0; i<chunk.length; i++){
		result.push(chunk[i].trim().split(''));
	}
	// console.log(result);
	bombMan(result);
}, MAP_SIZE);

function bombMan(data){
	var maxBomb = {
		x: 0,
		y: 0,
		numBomb: 0
	};
	for(var i=0; i<MAP_SIZE; i++){
		for(var j=0; j<MAP_SIZE; j++){
			if(data[i][j] === '.'){
				// '.' 空地
				var numBomb = 0;
				var x = i, y = j;
				do{//向上寻找
					if(data[x][y--] === 'G')
						numBomb++;
				}while(data[x][y] !== '#')

				x = i, y = j;
				do{//向下寻找
					if(data[x][y++] === 'G')
						numBomb++;
				}while(data[x][y] !== '#')

				x = i, y = j;
				do{//向左寻找
					if(data[x--][y] === 'G')
						numBomb++;
				}while(data[x][y] !== '#')

				x = i, y = j;
				do{//向右寻找
					if(data[x++][y] === 'G')
						numBomb++;
				}while(data[x][y] !== '#')

				if(maxBomb.numBomb < numBomb){
					maxBomb.x = i+1;
					maxBomb.y = j+1;
					maxBomb.numBomb = numBomb;
				}
			}
		}
	}
	console.log([maxBomb.x, maxBomb.y, maxBomb.numBomb].join('***'));
}

//in-MAP
// #############
// #GG.GGG#GGG.#
// ###.#G#G#G#G#
// #.......#..G#
// #G#.###.#G#G#
// #GG.GGG.#.GG#
// #G#.#G#.#.###
// ##G...G.....#
// #G#.#G###.#G#
// #...G#GGG.GG#
// #G#.#G#G#.#G#
// #GG.GGG#G.GG#
// #############

//out put 10 10 8

// #############
// #GG.GGG#GGG.#
// ###.#G#G#G#G#
// #.......#..G#
// #G#.###.#G#G#
// #GG.GGG.#.GG#
// #G#.#G#.#.#.#
// ##G...G.....#
// #G#.#G###.#G#
// #...G#GGG.GG#
// #G#.#G#G#.#G#
// #GG.GGG#G.GG#
// #############

//2 12 11
//如何解决小人走不到(2, 12)