var myCons = require('../console-read/demo1');

var bucketSort = function(dataArr){
	var bucket = [];
	var result = [];
	for(var i=0, len=dataArr.length; i<len; i++){
		bucket[dataArr[i]] ? bucket[dataArr[i]]++ : bucket[dataArr[i]] = 1;
	}
	// console.log(bucket);
	for(i=1000; i>=0; i--){
		var num = bucket[i] || 0;
		for(j=0; j<num; j++)
			result.push(i);
	}
	return result;
}

myCons.scanfLine(function(chunk){
	var dataInt = myCons.dataToInt(chunk);
	var result = bucketSort(dataInt);
	console.log(result.join(','));
});

/**
*	最简单快速的桶排序
*
*	M个桶 N个数据
*	时间复杂度O(m+n)
*/