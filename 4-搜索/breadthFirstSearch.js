var myCons = require('../console-read/demo1');

var Map = null;
var book = [];
var stepFlag = [];
var next = [[1, 0], [0, 1], [-1, 0], [0, -1]];
// flag 
// {
// 	x:,
// 	y:,
// 	setp:
// }
var W = 0;
var H = 6;
var StartPoint = {x:0, y:0};
var EndPoint = {x:0, y:0};
myCons.scanfLines(function(chunk){
	for(var i=0; i<chunk.length; i++){
		chunk[i] = myCons.dataToInt(chunk[i]);
	}
	// console.log(chunk);
	var point = chunk[H-1];
	W = chunk[0].length;
	StartPoint.x = point[0] - 1;
	StartPoint.y = point[1] - 1;
	EndPoint.x = point[2] - 1;
	EndPoint.y = point[3] - 1;

	Map = chunk.slice(0, H-1);

	for(i=0; i<H-1; i++){
		book[i] = [];
		for(var j=0; j<W; j++)
			book[i][j] = 0;
	}
	// console.log(book);
	mapByBFS(StartPoint.x, StartPoint.y, 0);
	console.log(stepFlag.pop());
}, H);

function mapByBFS(x, y, step){
	var tx=0, ty=0;
	var lastPoint = null;
	var lastStep = step;
	stepFlag.push({
		x: x,
		y: y,
		step: step
	});
	while(tx !== EndPoint.x || ty !== EndPoint.y){
		lastPoint = stepFlag.filter(function(value){
			return value.step === lastStep;
		});//取出上一次节点
		for(var k=0; k<lastPoint.length; k++){
			x = lastPoint[k].x;
			y = lastPoint[k].y;
			for(var i=0; i<4; i++){
				tx = x + next[i][0];
				ty = y + next[i][1];
				//遍历四个方向上的可走步数
				if(tx < 0 || (tx+1)> W || ty < 0 || (ty+1) >H)
					continue;//溢出检测

				if(book[tx][ty] === 0 && Map[tx][ty] === 0){
					//可以走 且没有被标记过
					book[tx][ty] = 1;
					stepFlag.push({
						x: tx,
						y: ty,
						step:lastStep+1
					});
				}
			}
		}
		lastStep++;
	}
}

// 0 0 1 0
// 0 0 0 0
// 0 0 1 0
// 0 1 0 0
// 0 0 0 1
// 1 1 4 3
//output : 7