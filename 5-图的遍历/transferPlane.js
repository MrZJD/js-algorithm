//最少转机-图的广度优先遍历

'use strict';

var myCons = require('../console-read/demo1');

var lineLength = 7;
var cityMap = [];
var cityNum = 5;
//init cityMap
for(let i=0; i<=cityNum; i++){
	cityMap[i] = [];
	for(let j=0; j<=cityNum; j++){
		cityMap[i][j] = 0;
	}
}

var startCity = 1;
var endCity = 5;

myCons.scanfLines(function(chunk){
	var len = chunk.length;
	var beforeMap = null;
	for(let i=0; i<len; i++){
		beforeMap = chunk[i].trim().split(' ');
		cityMap[beforeMap[0]][beforeMap[1]] = 1;
		cityMap[beforeMap[1]][beforeMap[0]] = 1;
	}
	// console.log(cityMap);
	transferPlaneByBFS();
	// console.log(BFSline);
}, lineLength);

var BFSbook = [];
//init BFSbook
for(let i=0; i<=cityNum; i++){
	BFSbook[i] = 0;
}
BFSbook[startCity] = 1;

var BFSline = [];
var head = 0;
var tail = 1;
BFSline.push({
	city:startCity,
	step:0
});

function transferPlaneByBFS(){
	while(head<tail){
		var currentCity = BFSline[head];
		if(currentCity.city === endCity){
			console.log(currentCity);
			return;
		}
		for(let i=0; i<=cityNum; i++){
			if(BFSbook[i] || !cityMap[currentCity.city][i]){
				continue;
			}
			BFSbook[i] = 1;
			BFSline.push({
				city:i,
				step:currentCity.step+1
			});
			tail++;
		}
		head++;
	}
}

//input
//x <-> y 可以相互到达
// 1 2
// 1 3
// 2 3
// 2 4
// 3 4
// 3 5
// 4 5