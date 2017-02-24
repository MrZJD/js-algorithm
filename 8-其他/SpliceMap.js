//关键城市--图的割点
//割点:割除某个城市后 该图不再连通->变成了多个图

//深度搜索确定每个城市的时间戳
//当遍历到第N个城市时,再次深度搜索确定在不经过父节点的情况
//可以到达的最小时间戳节点
//通过判断父节点的最小时间戳 和 该节点不经过其可以到达的最小时间戳
//的大小关系 可以得出哪个是关键城市-图的割点

var myConsole = require('../console-read/demo1');

var Map = []; //-> 矩阵存图 // -> 可以优化为邻接表
var MapCityCount;
var index = 0;
var root = 0;

var Num = [], //第一次搜索时间戳
	Low = [], //最小时间戳
	flag = []; //割点

myConsole.scanfLines(function(chunk){
	init(chunk);

	root = 1;
	dfs(1, root);

	console.log(flag);
}, 8);

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
	MapCityCount = Map.length;
	// console.log(Map);
}

function dfs(son, father){
	index++;
	Num[son] = index,
	Low[son] = index; //深度搜索时进行了赋值
	var child = 0;//son 的子节点

	//***********	
	//割点算法核心
	//***********
	for(var i=1; i<=MapCityCount; i++){
		if(Map[son][i] === 1){
			//son -> i 存在边时
			if( !Num[i] ){//时间戳还不存在 搜索还没有经历到该点
				child++;
				dfs(i, son);//继续向下搜索 -> 实际上已经确定了生成树
				Low[son] = Math.min(Low[son], Low[i]);//更新low
				if( son!==root && Low[i] >= Num[son] ){ //深刻理解>=
					flag[son] = 1; //满足条件 即为割点
				}
				if( son===root && child===2 ){
					flag[son] = 1;
				}
			}else if( i !== father ){
				Low[son] = Math.min(Low[son], Num[i]);
			}
		}
	}
}

//input
// n个城市 m条边
// 6 7
// 1 4
// 1 3
// 4 2
// 3 2
// 2 5
// 2 6
// 5 6

//output:2