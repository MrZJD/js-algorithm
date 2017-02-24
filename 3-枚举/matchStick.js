var myCons = require('../console-read/demo1');


myCons.scanfLine(function(chunk){
	var stickNum = myCons.dataToInt(chunk)[0];

	var result = matchStick(stickNum);

	// console.log(stickNum);
	// console.log(calcStick(stickNum));
});

function matchStick(num){
	//1,=,+=>2
	//7=>3
	//4=>4
	//2,3,5=>5
	//6,9,0=>6
	//8=>7
	//A+B=C
	var dataLimit = [1, 11, 111, 1111, 11111, 111111, 1111111, 11111111];

	var leftNum = num-4;
	var limit = parseInt(leftNum/2)-2;//limit位数
	var limitNum = dataLimit[limit+1];
	for(var i=0; i<limitNum; i++){
		var A = i;
		var numA = calcStick(A);
		for(var j=0; j<limitNum; j++){
			var B = j;
			var numB = calcStick(B);
			if(numA+numB < leftNum){
				var C= i+j;
				var left = leftNum - numA - numB;
				if(calcStick(C) === left){
					console.log(A+'+'+B+'='+C);
				}
			}
		}
	}
}

function calcStick(num){
	var stickData = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
	var flag = 0;
	var count = 0;
	do{
		flag = num%10;
		num = Math.floor(num/10);
		count += stickData[flag];
	}while(num > 0)
	return count;
}