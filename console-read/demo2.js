var readline = require('readline');

// var rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// });

// rl.on('line', function(chunk){
// 	console.log("[CONSOLE OUT READLINE] "+chunk);
// });
var RL = [];
exports.scanfLine = function(handler){
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on('line', handler);

	return rl && RL.push(rl);
};
exports.closeRL = function(rl){
	rl ? rl.close() : RL[0].close();
}