var net = require('net'),
	client = new net.Socket(),
	readline = require('readline'),
	op = require('./operations.js');

client.connect(47134, '127.0.0.1');
client.on('data', function (data) {
	console.log(data.toString());
	input.prompt();
});

var input = readline.createInterface(process.stdin, process.stdout);
input.setPrompt('loki> ');
input.prompt();
input.on('line', function (line) {
	var pieces = line.split(' ', 2),
		obj;
	try {
		obj = JSON.parse(line.replace(pieces.join(' '), ''));
		var message = {
			collection: pieces[1],
			op: op['OP_' + pieces[0].toUpperCase()],
			obj: obj
		};
		client.write(JSON.stringify(message), 'utf8');

	} catch (err) {
		console.error(err);
	}
	input.prompt();
}).on('close', function () {
	process.exit(0);
});