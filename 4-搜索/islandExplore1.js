var myCons = require('../console-read/demo1');

var Map = null;
var bookPoint = [];
var nextStep = [[1, 0], [0, 1], [-1, 0], [0, -1]];

var H = 10;
var W = 0;

myCons.scanfLines(function(chunk){
	Map = [];
	for(var i=0; i<chunk.length; i++){
		Map[i] = chunk[i].trim().split(' ');
	}
	W = Map[0].length;
	for(i=0; i<H; i++){
		bookPoint[i] = [];
		for(var j=0; j<W; j++){
			bookPoint[i][j] = 0;
		}
	}
	// console.log(bookPoint);
	islandAllExplore()
	// islandExploreByDFS(5, 7);
	console.log(bookPoint);
}, H);

function islandExploreByDFS(startX, startY){
	var tx, ty;
	for(var i=0; i<4; i++){
		tx = startX + nextStep[i][0];
		ty = startY + nextStep[i][1];

		if(tx < 0 || (tx+1) > H || ty < 0 || (ty+1) > W)
			continue;

		if(bookPoint[tx][ty] === 0 && Map[tx][ty] > 0){
			bookPoint[tx][ty] = 1;
			islandExploreByDFS(tx, ty);
			// bookPoint[tx][ty] = 0;
		}
	}
	return ;
}

function islandAllExplore(){
	for(var i=0; i<H; i++){
		for(var j=0; j<W; j++){
			if(Map[i][j] > 0){
				islandExploreByDFS(i, j);
			}
		}
	}
}

//input 10*10
// 1 2 1 0 0 0 0 0 2 3
// 3 0 2 0 1 2 1 0 1 2
// 4 0 1 0 1 2 3 2 0 1
// 3 2 0 0 0 1 2 4 0 0
// 0 0 0 0 0 0 1 5 3 0
// 0 1 2 1 0 1 5 4 3 0
// 0 1 2 3 1 3 6 2 1 0
// 0 0 3 4 8 9 7 5 0 0
// 0 0 0 3 7 8 6 0 1 2
// 0 0 0 0 0 0 0 0 1 0