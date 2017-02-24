var myCons = require('../console-read/demo1');

var lineA = [];
var lineB = [];
var stackTable = [];

myCons.scanfLines(function(chunk){
	lineA = myCons.dataToInt(chunk[0]);
	lineB = myCons.dataToInt(chunk[1]);

	while(1){
		if(lineA.length === 0){
			console.log("A win!");
			console.log(["A:"+lineA, "B:"+lineB, "table:"+stackTable].join('**'));
			break;
		}else if(lineB.length === 0){
			console.log("B win!");
			console.log(["A:"+lineA, "B:"+lineB, "table:"+stackTable].join('**'));
			break;
		}
		playCard();
	}
	
}, 2);

function playCard(){
	//play A
	stackTable.push(lineA[0]);
	lineA.shift();
	// console.log([lineA, lineB, stackTable].join('**'));
	collectCard(0);

	//play B
	stackTable.push(lineB[0]);
	lineB.shift();
	// console.log([lineA, lineB, stackTable].join('**'));
	collectCard(1);

	console.log([lineA, lineB, stackTable].join('**'));
}

function collectCard(flag){
	var lastIndex = stackTable.length-1;
	var firstIndex = stackTable.indexOf(stackTable[lastIndex]);
	if(firstIndex === lastIndex || firstIndex < 0){
		//不存在重复
		return false;
	}else{
		var spliceData = stackTable.splice(firstIndex,lastIndex-firstIndex+1);
		// console.log(stackTable);
		if(flag === 0){
			lineA = lineA.concat(spliceData);
		}else if(flag === 1){
			lineB = lineB.concat(spliceData);
		}
		return true;
	}
}

//拖拉机游戏