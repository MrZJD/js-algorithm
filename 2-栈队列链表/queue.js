var myCons = require('../console-read/demo1');

var QQSortByQueue = function(data){
	var head = 0, tail = data.length-1;
	var result = [];
	while(head <= tail){
		result.push(data[head]);
		data[++head] && data.push(data[head]);
		head++;
		tail++;
	}
	console.log(data);
	console.log(result);
};

myCons.scanfLine(function(chunk){
	var data = myCons.dataToInt(chunk);
	QQSortByQueue(data);
});

/**
*	Queue队列 -- 数据结构
*	data[] head tail
*
*	FIFO 先进先出
*/