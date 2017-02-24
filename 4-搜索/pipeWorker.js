var myCons = require('../console-read/demo1');

var Map = null;
var bookPoint = [];
var DFSline = [];
var head = -1;
var H = 5;
var W = 0;

var EndPoint = null;

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
	EndPoint = {x:H-1, y:W};
	// console.log(Map);
	if(findPipe(0, 0, 1)){
		console.log(Map);
	}
}, H);

function findPipe(x, y, front){
	//front表示进水口
	//dfs
	if(x === EndPoint.x && y === EndPoint.y){
		for(var i=0; i<=head; i++){
			console.log(DFSline[i].x + "**" + DFSline[i].y);
		}
		return;
	}

	if(x<0 || (x+1)>H || y<0 || (y+1) > W)
		return;

	if(bookPoint[x][y] === 1)
		return;

	bookPoint[x][y] = 1;
	DFSline[++head] = {x:x, y:y};

	if(Map[x][y] >= 5 && Map[x][y]<=6){//直管
		if(front === 1)//左
			findPipe(x, y+1, 1);//右边出水 下一个左边进水
		if(front === 2)//上
			findPipe(x+1, y, 2);//
		if(front === 3)//右
			findPipe(x, y-1, 3);
		if(front === 4)//下 //具体可能不会实现
			findPipe(x-1, y, 4);
	}

	if(Map[x][y]<5 && Map[x][y]>0){
		if(front == 1 || front == 3){//left{
			findPipe(x-1, y, 4);
			findPipe(x+1, y, 2);
		}
		if(front == 2 || front == 4){//top
			findPipe(x, y+1, 1);
			findPipe(x, y-1, 3);
		}
		// if(font == 3){//right
		// 	findPipe(x-1, y, 4);
		// 	findPipe(x+1, y, 2);
		// }
		// if(font == 4){//bottom
		// 	findPipe(x, y+1, 1);
		// 	findPipe(x, y-1, 3);
		// }
	}
	bookPoint[x][y] = 0;
	head--;
	return;
}

//input
// 5 3 5 3
// 1 5 3 0
// 2 3 5 1
// 6 1 1 5
// 1 5 5 4

//深度搜索又一具体应用

//具体设计体现在每次操作所要重用的步骤