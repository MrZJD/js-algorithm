var myCons = require('../console-read/demo1');

var minLength = null;
var H = 6;
var W = 0;
var Map = null; //当前地图
var book = []; //标记地图
var EndPoint = {x:0, y:0};
var next = [[0, 1], [1, 0], [0, -1], [-1, 0]];

myCons.scanfLines(function(chunk){
	var data = [];
	for(var i=0; i<chunk.length; i++){
		data.push(myCons.dataToInt(chunk[i]));
	}

	Map = data.slice(0, H-1);
	// console.log(Map);
	W = data[0].length;
	EndPoint.x = data[H-1][2] - 1;
	EndPoint.y = data[H-1][3] - 1;

	for(i=0; i<H-1; i++){
		book[i] = [];
		for(var j=0; j<W; j++)
			book[i][j] = 0;
	}

	// console.log(data[H-1][0] - 1);
	mapDfs(data[H-1][0] - 1, data[H-1][1] - 1, 0);
	console.log(minLength);
}, H);

function mapDfs(x, y, step){
	var tx, ty, k;

	if(x==EndPoint.x && y==EndPoint.y){
		// console.log(minLength);
		if(!minLength)minLength=step;
		if(step < minLength){
			minLength = step;
		}
		return;
	}

	for(var k=0; k<=3; k++){
		tx = x + next[k][0];
		ty = y + next[k][1];

		if(tx<0 || (tx+1)>W || ty<0 || (ty+1)>H)
			continue;

		// console.log(Map);
		if(Map[tx][ty] === 0 && book[tx][ty] === 0){
			// console.log(tx+"*"+ty);
			book[tx][ty] = 1;
			arguments.callee(tx, ty, step+1);
			book[tx][ty] = 0;
		}
	}
	return;
}

//input
//最后一行为两个点的坐标
// 0 0 1 0
// 0 0 0 0
// 0 0 1 0
// 0 1 0 0
// 0 0 0 1
// 1 1 4 3