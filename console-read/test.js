var myCons1 = require('./demo1');
var myCons2 = require('./demo2');

var COUNT = 5;
// myCons1.scanfLine(function(chunk){
// 	console.log(["Hello World", COUNT, ":", chunk].join(''));
// 	if(--COUNT < 1) myCons1.closeSTDIN();
// });
// ==>> 每行结果会多输出一个\n

// myCons2.scanfLine(function(chunk){
// 	console.log(["Hello World", COUNT, ":", chunk].join(''));
//  	if(--COUNT < 1) myCons2.closeRL();
// });

// ==>> 可以再深度封装一个N次读取数据的函数