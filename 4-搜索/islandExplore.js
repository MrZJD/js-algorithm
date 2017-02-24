var myCons = require('../console-read/demo1');

var Map = null;
var bookPoint = [];
var H = 10;
var W = 0;
var dropPoint = {x:6, y:8};
var nextStep = [[1, 0], [0, 1], [-1, 0], [0, -1]];
var BFSline = [];

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
	islandExplore();
	console.log(bookPoint);
}, H);

function islandExplore(){
	var tx=0, ty=0;
	var head = 0, tail = 1;
	var x, y, lastStep;
	BFSline.push({
		x:dropPoint.x-1,
		y:dropPoint.y-1,
		step:0
	});
	while(head<tail){
		x = BFSline[head].x;
		y = BFSline[head].y;
		lastStep = BFSline[head].step;
		for(var i=0; i<4; i++){
			tx = x + nextStep[i][0];
			ty = y + nextStep[i][1];

			if(tx < 0 || (tx+1) > H || ty < 0 || (ty+1) > W)
				continue;

			if(bookPoint[tx][ty] === 0 && Map[tx][ty] > 0){
				bookPoint[tx][ty] = 1;
				BFSline.push({
					x:tx,
					y:ty,
					step:lastStep+1
				});
				tail++;
			}
		}
		head++;
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