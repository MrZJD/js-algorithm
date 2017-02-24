//利用邻接表存储图
//进行优化算法
//在稀松图中算法提高算法效率

//u[i] -> v[i] = w[i];
//first[u[i]] //u[i]的某一条边的编号
//next[i] //编号i的下一条边编号
'use strict';

var myCons = require('../console-read/demo1');

var dataMapLength = 5;

//middle var
var u = [];
var v = [];
var w = [];
var first = [];//length = 节点数
var next = [];//稀松图 假设不会太大 即最大为边总数

var pointNum = 4;
for(let i=0; i<pointNum; i++){
	first[i] = -1;
}
for(let i=0; i<dataMapLength; i++){
	next[i] = -1;
}

myCons.scanfLines(function(chunk){
	var lineVar;
	for(let i=0; i<chunk.length; i++){
		lineVar = myCons.dataToInt(chunk[i]);
		u[i] = lineVar[0];
		v[i] = lineVar[1];
		w[i] = lineVar[2];

		//首先push进节点的边链表
		var nextLine = [];
		var nextDis = first[u[i]-1];
		nextLine.push(i);
		while(nextDis >= 0){
			nextLine.push(nextDis);
			nextDis = next[nextDis];
		}
		for(let i=0; i<nextLine.length-1; i++){
			next[nextLine[i]] = nextLine[i+1];
		}
		first[u[i]-1] = i;//存入编号i-1的边
	}
	console.log(u+'\n'+v+'\n'+w);
	console.log(first+'\n'+next);
}, dataMapLength);

//test data input for 稀松图
//input
// 1 4 9
// 4 3 8
// 1 2 5
// 2 4 6
// 1 3 7