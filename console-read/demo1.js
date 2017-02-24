//var result = [];
process.stdin.on('end', function(){
	process.stdout.write('end');
});

var EXIT = 1;
function gets(cb){
	process.stdin.resume();
	process.stdin.setEncoding('utf-8');
	process.stdin.on('data', function(chunk){
		//process.stdin.pause(); 取消暂停后输入流会一直存在 直到进程结束
		if(!EXIT){
			EXIT = 1;
			return process.stdin.pause();
		}
		if(chunk.trim() === ''){
			return EXIT--;
		} //连续两次控制输入退出输入流的监听
		cb(chunk);
	});
}
// function dealHandler1(chunk){
// 	console.log("1:"+chunk);
// }

function dataToInt(chunk){
	var data = chunk.split(" ");
	var swap = '';
	for(var i=data.length-1; i>=0; i--){
		swap = data[i].trim();
		data[i] = parseInt(swap);
	}
	for(i=data.length-1; i>=0; i--){
		if(data[i] === ''){
			data.splice(i, 1);
		}
	}
	return data;
}; //==>> 可以更深度封装为 scanfIntLine(handler) //return data#Array

//gets(dealHandler1);
exports.scanfLine = function(handler){
	gets(handler);
};

exports.closeSTDIN = function(){
	process.stdin.removeAllListeners('data');
	process.stdin.pause();
};

exports.dataToInt = dataToInt;

exports.dataToArr = function(dataArr){
	var data = dataArr, i=j=0;
	var swap = '';
	var demoArr = null;
	for(i=data.length-1; i>=0; i--){
		swap = data[i];
		demoArr = swap.split(" ");
		for(j=demoArr.length-1; j>=0; j--){
			demoArr[j] = demoArr[j].trim();
		}
		data[i] = demoArr;
	}
	return data;
};


var COUNT = 0;
var result = null;
function getsLines(cb){
	process.stdin.resume();
	process.stdin.setEncoding('utf-8');
	process.stdin.on('data', function(chunk){
		//process.stdin.pause(); 取消暂停后输入流会一直存在 直到进程结束
		if(!EXIT){
			EXIT = 1;
			return process.stdin.pause();
		}
		if(chunk.trim() === ''){
			return EXIT--;
		} //连续两次控制输入退出输入流的监听

		result.push(chunk);
		COUNT--;

		if(!COUNT){
			cb(result);
			result = null;
			EXIT = 1;
			return process.stdin.pause();
		}
	});
}

exports.scanfLines = function(handler, count){
	COUNT = count;
	result = [];
	getsLines(handler);
};