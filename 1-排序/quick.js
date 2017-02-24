var myCons = require('../console-read/demo1');

var quickSort = function(dataArr, left, right){
	var i, j, t, temp;
	if(left >= right){
		return dataArr;
	}

	temp = dataArr[left];
	i = left;
	j = right;

	while(i!=j){
		while(dataArr[j] >= temp && i<j)
			j--;
		while(dataArr[i] <= temp && i<j)
			i++;
		if(i<j){
			t = dataArr[i];
			dataArr[i] = dataArr[j];
			dataArr[j] = t;
		}
	}

	dataArr[left] = dataArr[i];
	dataArr[i] = temp;

	dataArr = arguments.callee(dataArr, left, i-1);
	dataArr = arguments.callee(dataArr, i+1, right);
	return dataArr;
};

// myCons.scanfLine(function(chunk){
// 	var data = myCons.dataToInt(chunk);
// 	var quick = quickSort(data, 0, data.length-1);
// 	console.log(quick);
// });

/**
*	QuickSort 快速排序
*
*	时间复杂度O(nlogn)
*/

exports.quickSort = quickSort;