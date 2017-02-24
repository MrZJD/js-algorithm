//镖局运镖-图的最小生成树

//Kruskal算法
//quickSort -> 排序路径
//并查表 -> 判断节点之间是否连通

var myConsole = require('../console-read/demo1');

var Roads = []; //存储边
var spot = []; //并查表 -> 地点/节点

myConsole.scanfLines(function(chunk){
	for(var i=0, l=chunk.length; i<l; i++){
		Roads[i] = myConsole.dataToInt(chunk[i]);
	}

	var roadsCount = Roads.length - 1,
		spotsCount = Roads[0][0];
	var count = 0, result = [];

	quickSort(1, roadsCount);//1-边总数 进行快排

	// console.log(Roads);

	for(var i=1; i<=spotsCount; i++){
		spot[i] = i; //init spot
	}
	
	// //**算法核心**//
	for(var i=1; i<=roadsCount; i++){
		if( merge(Roads[i][0], Roads[i][1]) ){
			count++;
			result.push(Roads[i]);
		}

		if( count === spotsCount-1 ){
			break;
		}
	}

	console.log(result);

}, 10);

function quickSort(left, right){
	if(left > right) return;

	var i=left, j=right; //left为基准
	var temp;

	while(i != j){
		//右边找 第一个比left小的数 停止
		while(Roads[j][2] >= Roads[left][2] && i<j) j--;
		//左边找 第一个比left大的数 停止
		while(Roads[i][2] <= Roads[left][2] && i<j) i++;

		//交换这两个数
		if(i < j){
			temp = Roads[i];
			Roads[i] = Roads[j];
			Roads[j] = temp;
		}
	}

	temp = Roads[left];
	Roads[left] = Roads[i];
	Roads[i] = temp; //基准数归位

	arguments.callee(left, i-1);
	arguments.callee(i+1, right);
	return;
}

function merge(x, y){
	var b1 = getBoss(x),
		b2 = getBoss(y);

	if( b1 !== b2 ){
		spot[b2] = b1;
		return true; //没有连通
	}

	return false;//连通
}

function getBoss(n){
	return spot[n] === n ? n : arguments.callee(spot[n]);
}

//input
// 6
// 2 4 11
// 3 5 13
// 4 6 3
// 5 6 4
// 2 3 6
// 4 5 7
// 1 2 1
// 3 4 9
// 1 3 2

//output 19

//Prim算法
//利用最短路径进行变得松弛来产生最小生成树 -> 稠密图

//另外可以通过邻接表 堆对Prim算法进行优化 -> 稀疏图