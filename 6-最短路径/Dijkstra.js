//通过边实现松弛
//单源最短路径//指定源点到其余各个顶点的最短路径

'use strict';

var myCons = require('../console-read/demo1');

var cityMap = [];
var cityCount = 6;
var lineLength = 9;

//init cityMap
for(let i=0; i<=cityCount; i++){
	cityMap[i] = [];
	for(let j=0; j<=cityCount; j++){
		cityMap[i][j] = i === j ? 0 : '#';
	}
}

myCons.scanfLines(function(chunk){
	var beforeMap = null;
	var len = chunk.length;
	for(let i=0; i<len; i++){
		beforeMap = myCons.dataToInt(chunk[i]);
		cityMap[beforeMap[0]][beforeMap[1]] = beforeMap[2];
	}
	console.log(cityMap);
	updateMapByDjikstra();
	console.log(cityMap);
}, lineLength);

function updateMapByDjikstra(){
	for(let i=1; i<=1; i++){
		var nextPoint = [1];
		var nowStep = 0;

		var before = nextPoint[0];
		var nowPoint = nextPoint[0];
		while(nextPoint.length){
			//1.找出其中最近的点。
			//before -> 上一个节点
			//nextPoint -> 循环目标
			var minStep = 0;
			var len = nextPoint.length;
			for(let j=0; j<len; j++){
				//**松弛计算
				if(cityMap[i][nextPoint[j]] === '#' ||
					cityMap[i][nextPoint[j]] > nowStep+cityMap[before][nextPoint[j]]){
					cityMap[i][nextPoint[j]] = nowStep+cityMap[before][nextPoint[j]];
				}
				//最小值
				if(!minStep || minStep > cityMap[before][nextPoint[j]]){
					minStep = cityMap[before][nextPoint[j]];
					nowPoint = nextPoint[j];
				}
			}

			// console.log(nextPoint);
			// console.log(nowPoint);

			//2.更新循环数据

			//3.更新nextPoint 根据当前最近点
			nowStep += minStep;
			before = nowPoint;
			nextPoint = [];
			for(let j=1; j<=cityCount; j++){
				if(cityMap[nowPoint][j]==='#' || nowPoint===j) continue;
				nextPoint.push(j);
			}
		}
	}
}

//input
// 1 2 1
// 1 3 12
// 2 3 9
// 2 4 3
// 3 5 5
// 4 3 4
// 4 5 13
// 4 6 15
// 5 6 4

//output
//1->x
//1 8 4 13 17;