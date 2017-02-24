/**
*	问题描述: isbn数字排序 去掉重复的数字

*	quickSort实现
*/

var myCons = require('../console-read/demo1');
var quick = require('./quick');

var buyBook = function(dataArr){
	var filterArr = [];
	for(var i=dataArr.length-1; i>=0; i--){
		filterArr.indexOf(dataArr[i]) < 0 && filterArr.push(dataArr[i]);
	}
	return quick.quickSort(filterArr, 0, filterArr.length-1);
};

myCons.scanfLine(function(chunk){
	var data = myCons.dataToInt(chunk);
	var result = buyBook(data);
	console.log(result);
});