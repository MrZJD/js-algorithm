var myCons = require('../console-read/demo1');

var Map = null;
var H = 13;

var bookPoint = [];
var BFSline = [];
var startPoint = {x:3, y:3};
var nextStep = [[1, 0], [0, 1], [-1, 0], [0, -1]];

//main 主程序入口
myCons.scanfLines(function(chunk){
	Map = [];
	//地图字符串转换成字符数组
	for(var i=0; i<chunk.length; i++){
		Map.push(chunk[i].trim().split(''));
	}
	W = Map[0].length;
	//初始化bookPoint
	for(i=0; i<H; i++){
		bookPoint[i] = [];
		for(var j=0; j<W; j++){
			if(Map[i][j] !== '.'){
				bookPoint[i][j] = 1;
			}else{
				bookPoint[i][j] = 0;
			}
		}
	}

	// console.log(bookPoint);
	bombMan();//选出所有可以到达的点
	// console.log(bookPoint);
	countBomb();//遍历点四个方向上的炸弹
}, H);

//广度搜索
function bombMan(){
	//广度搜索所有可以到达的点
	var tx=0, ty=0;
	var x = startPoint.x, y = startPoint.y;
	var lastPoint = null;//表示上一个节点
	var lastStep = 0;//表示已走的步数
	var head = 0, tail = 1;//
	BFSline.push({
		x:x,
		y:y,
		step:lastStep
	});//初始化第一次
	while(head < tail){
		x = BFSline[head].x;
		y = BFSline[head].y;
		lastStep = BFSline[head].step;
		for(var i=0; i<4; i++){
			tx = x + nextStep[i][0];
			ty = y + nextStep[i][1];

			if(tx < 0 || (tx+1)> W || ty < 0 || (ty+1) >H)
					continue;//溢出检测

			if(bookPoint[tx][ty] === 0){
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

//枚举
function countBomb(){
	var maxBomb = {
		x: 0,
		y: 0,
		numBomb: 0
	};
	var len = BFSline.length
	for(var i=0; i<len; i++){
		var numBomb = 0;
		var x = BFSline[i].x, y = BFSline[i].y;
		do{//向上寻找
			if(Map[x][y--] === 'G')
				numBomb++;
		}while(Map[x][y] !== '#')

		y = BFSline[i].y;
		do{//向下寻找
			if(Map[x][y++] === 'G')
				numBomb++;
		}while(Map[x][y] !== '#')

		y = BFSline[i].y;
		do{//向左寻找
			if(Map[x--][y] === 'G')
				numBomb++;
		}while(Map[x][y] !== '#')

		x = BFSline[i].x;
		do{//向右寻找
			if(Map[x++][y] === 'G')
				numBomb++;
		}while(Map[x][y] !== '#')

		if(maxBomb.numBomb < numBomb){
			maxBomb.x = BFSline[i].x+1;
			maxBomb.y = BFSline[i].y+1;
			maxBomb.numBomb = numBomb;
		}
	}
	console.log([maxBomb.x, maxBomb.y, maxBomb.numBomb].join('***'));
}


//input
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

// 8 12 10