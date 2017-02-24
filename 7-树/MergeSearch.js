//并查集
//通过一个一维数组来实现
//本质是维护一个森林 森林的每个点都是孤立的
//通过一些条件逐渐将这些树合并成一个大树
//过程需要遵守一定的规则-靠左/右-擒贼先擒王

//通过犯罪团伙的例子给出代码示例
var myConsole = require('../console-read/demo1');

var crime = [];

myConsole.scanfLines(function(chunk){
	for(var i=0, l=chunk.length; i<l; i++){
		chunk[i] = myConsole.dataToInt(chunk[i]);
	}

	initCrime(chunk[0][0]);

	for(var i=1, l=chunk.length; i<l; i++){
		merge(chunk[i][0], chunk[i][1]);
	}

	// console.log(crime);
	for(var i=1, num=chunk[0][0]; i<=num; i++){
		if(crime[i] === i){
			console.log(i);
		}
	}
}, 9);

function initCrime(num){
	for(var i=1; i<=num; i++){
		crime[i] = i;
	}
}

function merge(x, y){
	var t1 = getBoss(x),
		t2 = getBoss(y);//擒王原则

	if(t1 !== t2){
		crime[t2] = t1;
		//靠左原则
	}
}

function getBoss(n){
	return crime[n] === n ? n : getBoss(crime[n]);
}

//input
// 10
// 1 2
// 3 4
// 5 2
// 4 6
// 2 6
// 8 7
// 9 7
// 1 6
// 2 4

//5 9 10