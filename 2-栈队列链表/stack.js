var myCons = require('../console-read/demo1');

var palindromeCheckByStack = function(data){
	var stack = [];
	var top = Math.floor(data.length/2) - 1;
	for(var i=0; i<=top; i++){
		stack.push(data[i]);
	}
	if(data.length%2 == 1){
		i++;
	}
	for(var j=stack.length-1; j>=0; i++,j--){
		switch(stack[j].charCodeAt(0)){
			case 40://()
				if(data[i].charCodeAt(0) !== 41) return false;
				break;
			case 91://[]
				if(data[i].charCodeAt(0) !== 93) return false;
				break;
			case 123://{}
				if(data[i].charCodeAt(0) !== 125) return false;
				break;
			default:
				if(stack[j] !== data[i]) return false;
		}
	}
	return true;
};

myCons.scanfLine(function(chunk){
	var data = chunk.trim();
	var isPalid = palindromeCheckByStack(data);
	console.log(isPalid);
});

/**
*	Stack -- 数据结构
*	data[] top
*
*	对称结构的判断
*/