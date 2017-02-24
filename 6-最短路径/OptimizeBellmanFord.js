//通过队列优化BellmanFord算法
//BellmanFord算法中两次循环 嵌套 分别遍历所有节点 与 所有边。效率不高
//que[] -> 来记录那些节点需要遍历 进行优化

'use strict';

var myCons = require('../console-read/demo1');
var dataLines = 7;
var pointNum = 5;

//数据结构-邻接表
var u = [];
var v = [];
var w = [];
var dis = [0];//存储源点到各点的最短距离

for(let i=1; i<pointNum; i++){
	dis[i] = 10000;//假设最大值
}

myCons.scanfLines(function(chunk){
	var dataDemo;
	for(let i=chunk.length-1; i>=0; i--){
		dataDemo = myCons.dataToInt(chunk[i]);
		u[i] = dataDemo[0];
		v[i] = dataDemo[1];
		w[i] = dataDemo[2];
	}
	OptimizeBellmanFord();
	// console.log(u+'\n'+v+'\n'+w);
	console.log(dis);
}, dataLines);

function OptimizeBellmanFord(){
	//队列优化
	var head = 0;
	var tail = 1;
	var que = [1];
	while(head<tail){
		//这里如果使用邻接表可以简化循环遍历->避免所有边遍历
		//邻接表存储时就将结点所有的边存好了
		var nowPoint = que[head];
		for(var i=0; i<u.length; i++){//遍历所有边
			if(u[i] === nowPoint){
				if(dis[v[i]-1] > dis[u[i]-1] + w[i]){//松弛
					dis[v[i]-1] = dis[u[i]-1] + w[i];
				}
				if(que.indexOf(v[i])<0){
					que.push(v[i]);
					tail++;
				}
			}
		}
		head++;
	}
}

//data input
// 1 2 2
// 1 5 10
// 2 3 3
// 2 5 7
// 3 4 4
// 4 5 5
// 5 3 6

//data output
// 0 2 5 9 9