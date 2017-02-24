//二分图的最大匹配

//二分图:一个图中的所有顶点可以被分为X/Y两个集合
//		 所有边的两个顶点恰好一个属于X,一个属于Y,每个集合内的顶点没有边相连

//分配方案:将x中的点与y中的点进行相连,每个点只能连接一次

//最大匹配思路:
//对点可以相连的边配对 找到一个增广路
//通过对所有未配对的点 找到最大匹配数

var myConsole = require('../console-read/demo1');

var Map = [];
var MapCityCount;

var match = [];//统计匹配情况
var book = [];//
var sum = 0;//匹配数

myConsole.scanfLines(function(chunk){
	init(chunk);

	for(var i=1; i<=MapCityCount; i++){
		match[i] = 0;
	}

	for(var i=1; i<=MapCityCount; i++){
		for(var j=1; j<=MapCityCount; j++){
			book[j] = 0;//清空上次搜索情况
		}
		if( dfs(i) ){
			console.log(i+"**");
			sum++;
		}
	}

	console.log(match);
}, 6);

function init(chunk){
	for(var i=0, l=chunk.length; i<l; i++){
		chunk[i] = myConsole.dataToInt(chunk[i]);
	}
	for(var i=1, l=chunk.length; i<l; i++){
		if( !Map[chunk[i][0]] ){
			Map[chunk[i][0]] = [];
		}
		if( !Map[chunk[i][1]] ){
			Map[chunk[i][1]] = [];
		}
		Map[chunk[i][0]][chunk[i][1]] = 1;
		Map[chunk[i][1]][chunk[i][0]] = 1;
	}
	MapCityCount = Map.length - 1;
	// console.log(Map);
}

function dfs(curr){
	for(var i=1; i<=MapCityCount; i++){
		//遍历所有顶点 是否可以配对
		if(book[i] === 0 && Map[curr][i] === 1){
			book[i] = 1;
			//i没有配对 或者 i之前配对的人可以找到别的配对者
			if( match[i] === 0 || dfs(match[i]) ){
				match[i] = curr;
				match[curr] = i;
				return true;
			}
		}
	}
	return false;
}

//input
// 6 5
// 1 4
// 1 5
// 2 5
// 2 6
// 3 4
 
//output 3