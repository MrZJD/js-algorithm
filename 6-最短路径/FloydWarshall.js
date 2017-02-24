//城市最短路径
'use strict';

var cityMap = [
	[0, 0, 0, 0, 0],
	[0, 0, 2, 6, 4],
	[0, '#', 0, 3, '#'],
	[0, 7, '#', 0, 1],
	[0, 5, '#', 12, 0]
];
var cityCount = cityMap.length - 1;

console.log(cityMap);
updateMap();
console.log(cityMap);

function updateMap(){
	for(var k=1; k<=cityCount; k++){
		updateCircle(k);
	}
};

function updateCircle(point){
	var i,j;
	var p = point;
	var N = cityCount;
	for(i=1; i<=N; i++){
		for(j=1; j<=N; j++){
			if(cityMap[i][p]==='#' || cityMap[p][j]==='#'){
				continue;
			}
			if(cityMap[i][j]==='#' || cityMap[i][j] > cityMap[i][p] + cityMap[p][j]){
				cityMap[i][j] = cityMap[i][p]+cityMap[p][j];
			}
		}
	}
}

//input
// city双向图
// 0 0 0 0 0
// 0 0 2 6 4
// 0 0 0 3 0
// 0 7 0 0 1
// 0 5 0 12 0