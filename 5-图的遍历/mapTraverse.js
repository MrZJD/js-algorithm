var myCons = require('../console-read/demo1');

var MAP = [];
var MAX_POINT = 5;
//MAX_POINT+1 * MAX_POINT+1 的矩阵

for(var i=0; i<=MAX_POINT; i++){
	MAP[i] = [];
	for(var j=0; j<=MAX_POINT; j++){
		MAP[i][j] = 0;
	}
}

myCons.scanfLines(function(chunk){
	var beforeMap = [];
	var k = 0, p = 0;
	for(var i=0; i<chunk.length; i++){
		beforeMap[i] = chunk[i].trim().split(' ');
		k = beforeMap[i][0];
		p = beforeMap[i][1];
		MAP[k][p] = 1;
	}

	console.log(MAP);
	//深度检索
	// DFSbook[1] = 1;
	// deepFirstSearch(1, 0);
	// console.log(DFSline);

	//广度检索
	BFSbook[1] = 1;
	breadthFirstSearch(1);
	console.log(BFSline);
}, 5);

/***深度检索部分**/
var DFSbook = [];//
var DFSline = [];

for(var i=0; i<=MAX_POINT; i++){
	DFSbook[i] = 0;
}

function deepFirstSearch(pointIndex, step){
	var i, len = MAP[pointIndex].length;
	for(i=0; i<len; i++){
		if(MAP[pointIndex][i] && !DFSbook[i]){
			DFSbook[i] = 1;
			DFSline.push({
				point:i,
				step:step+1
			});
			deepFirstSearch(i, step+1);
		}
	}
}

//***广度检索部分**/
var BFSbook = [];
var BFSline = [];
for(var i=0; i<=MAX_POINT; i++){
	BFSbook[i] = 0;
}
function breadthFirstSearch(firstPoint){
	var head = 0, tail = 1;
	var lastStep = 0;
	BFSline.push({
		point:firstPoint,
		step:lastStep
	});
	while(head<tail){
		var nowPoint = BFSline[head].point;
		lastStep = BFSline[head].step;
		var len = MAP[nowPoint].length;
		for(i=0; i<len; i++){
			if(MAP[nowPoint][i] && !BFSbook[i]){
				BFSbook[i] = 1;
				BFSline.push({
					point:i,
					step:lastStep+1
				});
				tail++
			}
		}
		head++;
	}
}

//map-图  用表来存储
//map[i][j] = 1 表示点i到点j有路径
//深度优先 与 广度优先

//input
// 1 2
// 1 3
// 1 5
// 2 4
// 3 5