//关键道路-图的割边
//割边:割除该边后, 使得图分裂为多个图, 不再连通


//************************
//*********以下是图的割点的代码
//*********原理相同. 
//********* Low[i] > Num[son] 
//*********改动出表示 子节点不能回到父节点
//************************

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
	Low = []; //最小时间戳

myConsole.scanfLines(function(chunk){
	init(chunk);

	root = 1;
	dfs(1, root);

}, 7);

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

	//***********	
	//割点算法核心
	//***********
	for(var i=1; i<=MapCityCount; i++){
		if(Map[son][i] === 1){
			//son -> i 存在边时
			if( !Num[i] ){//时间戳还不存在 搜索还没有经历到该点

				dfs(i, son);//继续向下搜索 -> 实际上已经确定了生成树
				Low[son] = Math.min(Low[son], Low[i]);//更新low
				if( Low[i] > Num[son] ){ //深刻理解>
					// flag[son] = 1; //满足条件 即为割点
					console.log(son + '--' + i)
				}

			}else if( i !== father ){
				Low[son] = Math.min(Low[son], Num[i]);
			}
		}
	}
}

//input
// n个城市 m条边
// 6 6
// 1 4
// 1 3
// 4 2
// 3 2
// 2 5
// 5 6

//output:
//5--6
//2--5

