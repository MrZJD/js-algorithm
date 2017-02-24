//解决负权边的图的最短路径问题
//数据结构 -> 数组

'use strict';

var myCons = require('../console-read/demo1');
var lineNum = 5;
var pointNum = 5;

//路径数组
var u = [];
var v = [];
var w = [];
var dis = [0];//存储源点到各点的最短距离

for(let i=1; i<pointNum; i++){
	dis[i] = 10000;//假设最大值
}

myCons.scanfLines(function(chunk){
	var demoLine;
	for(let i=0; i<chunk.length; i++){
		demoLine = myCons.dataToInt(chunk[i]);
		u[i] = demoLine[0];
		v[i] = demoLine[1];
		w[i] = demoLine[2];
	}
	BellmanFord();
	console.log(dis);
}, lineNum);

function BellmanFord(){
	for(let i=1; i<pointNum; i++){
	//循环->解决负权边(n个节点最长路径为n-1)
		for(let j=0; j<lineNum; j++){//边循环
			if(dis[v[j]-1] > dis[u[j]-1] + w[j]){//松弛
				dis[v[j]-1] = dis[u[j]-1] + w[j];
			}
		}
	}
}

// input
// 2 3 2
// 1 2 -3
// 1 5 5
// 4 5 2
// 3 4 3

// output
// 0 -3 -1 2 4