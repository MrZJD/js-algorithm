//城市地图-图的深度优先遍历-最短路径
'use strict';

var myCons = require('../console-read/demo1');

var lineLength = 8;
var cityMap = [];
var cityNum = 5;

var startCity = 1;
var endCity = 5;

//init #cityMap
for(let i=0; i<=cityNum; i++){
	cityMap[i] = [];
	for(let j=0; j<=cityNum; j++){
		cityMap[i][j] = 0;
	}
}
// console.log(cityMap);


myCons.scanfLines(function(chunk){
	var i=chunk.length-1;
	var cityRoad = null;
	for(;i>=0; i--){
		cityRoad = myCons.dataToInt(chunk[i]);
		//**有向图
		//cityRoad[0] -> cityRoad[1];
		//x -> y
		// cityMap[cityRoad[0]][cityRoad[1]] = cityRoad[2];

		//**无向图
		cityMap[cityRoad[0]][cityRoad[1]] = cityRoad[2];
		cityMap[cityRoad[1]][cityRoad[0]] = cityRoad[2];
	}
	console.log(cityMap);
	mapReadByDFS(startCity, 0);
	console.log(minStep);
}, lineLength);

var DFSbook = [];//init DFSbook
for(let i=0; i<=cityNum; i++){
	DFSbook[i] = 0;
}
DFSbook[startCity] = 1;

var minStep = 999999;
var stepLine = [];
stepLine.push(startCity);

function mapReadByDFS(cityPoint, step){
	if(cityPoint == endCity){
		console.log(stepLine.join('->')+'='+step);
		if(step<minStep){
			minStep = step;
		}
		return;
	}
	if(cityPoint < 1){
		return;
	}
	var currentCityRoads = cityMap[cityPoint];
	var len = currentCityRoads.length;
	for(var i=0; i<len; i++){
		if(DFSbook[i] || !currentCityRoads[i]){
			continue;
		}
		DFSbook[cityPoint] = 1;
		stepLine.push(i);
		mapReadByDFS(i, step+currentCityRoads[i]);
		stepLine.pop();
		DFSbook[cityPoint] = 0;
	}
}

//input
//有向图
//x y l //x -> y 的距离
// 1 2 2
// 1 5 10
// 2 3 3
// 2 5 7
// 3 1 4
// 3 4 4
// 4 5 5
// 5 3 3