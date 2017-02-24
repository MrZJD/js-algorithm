var myCons = require('../console-read/demo1');

var bubbleSort = function(dataArr){
	var i=0, j=0, swap=0;
	for(i=0,len=dataArr.length-1; i<len; i++){
		for(j=0; j<len-i; j++){
			if(dataArr[j] < dataArr[j+1]){
				swap = dataArr[j];
				dataArr[j] = dataArr[j+1];
				dataArr[j+1] = swap;
			}
		}
	}
	return dataArr;
};

var bubbleSortArr = function(dataArr, sortFun){
	var i=0, j=0, swap=null;
	for(i=0,len=dataArr.length-1; i<len; i++){
		for(j=0; j<len-i; j++){
			if(sortFun(dataArr[j], dataArr[j+1]) > 0){
				swap = dataArr[j];
				dataArr[j] = dataArr[j+1];
				dataArr[j+1] = swap;
			}
		}
	}
	return dataArr;
};

// 纯数字排序
// myCons.scanfLine(function(chunk){
// 	var data = myCons.dataToInt(chunk);
// 	var result = bubbleSort(data);
// 	console.log(result.join(','));
// });

// 对象排序
var COUNT=0;
var result = [];
myCons.scanfLine(function(chunk){
	if(!COUNT){
		return COUNT = parseInt(chunk);
	}else{
		result.push(chunk);
		if(--COUNT <= 0 ){
			//console.log(result);
			var myResult = myCons.dataToArr(result);
			myResult = bubbleSortArr(myResult, function(childArr_1, childArr_2){
				// console.log([childArr_1, childArr_2].join(",,"));
				if(parseInt(childArr_1[1]) < parseInt(childArr_2[1])){
					return 1;
				}else{
					return 0;
					//可以进行二次判断 即相等情况下再根据另一个数据比较
				}
			});
			console.log(myResult);

			result = [];
		}
	}
});

/**
*	Bubble 冒泡排序
*
*	时间复杂度O(n*n)
*/