var myConsole = require('../console-read/demo1');
//实现堆
//1.堆的建立 -> 即堆的排序
//2.实现最小堆(父节点存储的数比子节点小) -> 添加一个新数并删除最小数(向下排序)
//                       -> 只添加一个数(向上排序)
//3.实现最大堆

//array -> database
var h; //存放堆
var n; //存放元素个数

myConsole.scanfLine(function(chunk){
	h = myConsole.dataToInt(chunk);
	n = h.length;
	init();

	for(var i=1, num=n; i<=num; i++){
		console.log(deleteMin());
		// console.log(h);
	}
});

function init(){
	//将堆进行排序 -> 最小堆
	for ( var i=parseInt(n/2); i>=1; i--) {
		// console.log(i);
		siftdown(i); //对非叶节点的子树进行向上调整
	}
	console.log(h);
}

function siftdown(i){
	//对i节点下的子节点进行向上调整
	var leftIndex, rightIndex, minIndex, flag=0;

	while( i*2 <= n && !flag ){//***//理解这个循环的作用
		//i 存在子节点 并且需要调整时 循环
		leftIndex = i*2 - 1, //从0开始
		rightIndex = i*2, //要进行数组调整
		minIndex = i-1; //***//切勿忘记数组调整
						//***//可以优化成h[0] = '' 从1开始堆栈

		if(h[leftIndex] && h[leftIndex] < h[minIndex]){
			minIndex = leftIndex;
		}
		if(h[rightIndex] && h[rightIndex] < h[minIndex]){
			minIndex = rightIndex;
		}
		
		if(minIndex !== i-1){
			swap(i-1, minIndex);
			i = minIndex+1;
		}else{
			flag = 1;
		}
	}
}

function swap(i, j){
	var temp = h[i];
	h[i] = h[j];
	h[j] = temp;
}

function deleteMin(){
	var t = h[0]; //堆顶
	h[0] = h[n-1]; //堆尾
	h.pop();
	n--;
	siftdown(1);//堆顶排序
	return t;
}
//input
// 99 5 36 7 22 17 92 12 2 19 25 28 1 46

//min heap: 1, 2, 17, 5, 19, 28, 46, 12, 7, 22, 25, 99, 36, 92
//max heap: 99, 25, 92, 12, 22, 28, 46, 7, 2, 19, 5, 17, 1, 36 

function initUp(){
	//将堆进行排序 -> 最小堆
	for ( var i=parseInt(n/2); i>=1; i--) {
		// console.log(i);
		siftup(i); //对非叶节点的子树进行向上调整
	}
	console.log(h);
}

function siftup(i){
	//对i节点下的子节点进行向上调整
	var leftIndex, rightIndex, maxIndex, flag=0;

	while( i*2 <= n && !flag ){//***//理解这个循环的作用
		//i 存在子节点 并且需要调整时 循环
		leftIndex = i*2 - 1, //从0开始
		rightIndex = i*2, //要进行数组调整
		maxIndex = i-1; //***//切勿忘记数组调整
						//***//可以优化成h[0] = '' 从1开始堆栈

		if(h[leftIndex] && h[leftIndex] > h[maxIndex]){
			maxIndex = leftIndex;
		}
		if(h[rightIndex] && h[rightIndex] > h[maxIndex]){
			maxIndex = rightIndex;
		}
		
		if(maxIndex !== i-1){
			swap(i-1, maxIndex);
			i = maxIndex+1;
		}else{
			flag = 1;
		}
	}
}

function deleteMax(){
	var t = h[0]; //堆顶
	h[0] = h[n-1]; //堆尾
	h.pop();
	n--;
	siftup(1);//堆顶排序
	return t;
}

//像这样支持插入元素和寻找最大最小值元素的数据结构 -> 优先队列