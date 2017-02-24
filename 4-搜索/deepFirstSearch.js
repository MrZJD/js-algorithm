var myCons = require('../console-read/demo1');

var a = [];
var book = [];
var N = 0;

myCons.scanfLine(function(chunk){
	N = myCons.dataToInt(chunk)[0];
	//初始化手牌
	for(var i=1; i<=N; i++){
		book[i] = 0;
	}

	dfs(1);
});

//example
//全排列
function dfs(step){
	var i;
	if(step === N+1){
		var result = [];
		for(i=1; i<=N; i++){
			result.push(a[i]);
		}
		console.log(result.join("**"));
		return;
	}

	for(i=1; i<=N; i++){//循环检测手牌
		if(book[i] === 0){
			a[step] = i;
			book[i] = 1;//发出牌

			arguments.callee(step+1);//递归
			book[i] = 0;//收回牌
		}
	}
	return;
}