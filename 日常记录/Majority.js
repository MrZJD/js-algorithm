//寻找多数元素
//一组数中存在一个元素出现次数超过一半以上 -> 主元素

var myConsole = require('../console-read/demo1');

myConsole.scanfLine(function(chunk){
	chunk = myConsole.dataToInt(chunk);

	var c = candidate(chunk, 0, chunk.length-1);

	//验证 排除数组中没有主元素的情况
	//1 2 3
	var count = 0;
	for(var i=0, l=chunk.length; i<l; i++){
		if(c === chunk[i]){
			count++;
		}
	}
	if(count > (chunk.length-1)/2){
		console.log(c);
	}else{
		console.log("none");
	}
});

function candidate(chunk, start, end){
	var c = chunk[start];
	var i = start, count = 1;
	while( i < end-1 && count > 0 ){
		i++;
		if( chunk[i] === c ){
			count++;
		}else{
			count--;
		}
	}

	if( i === end ){
		return c;
	}else{
		// console.log(i+"*");
		return arguments.callee(chunk, i+1, end);
	}
}

//candidate 的思想大致为:
//一组数去除掉两个不相同的数之后 剩下的数依然存在主元素
//6 6 6 3 2 1 6 5 6
//=> 6 5 6
//=> 6