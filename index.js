var net = require('net'),
	client = new net.Socket();

client.connect(47134, '127.0.0.1');
client.write(JSON.stringify({
	op: 3000,
	collection: 'users',
	obj: {
		name: 'joe'
	}
}), 'utf8');
client.on('data', function (data) {
	var obj = JSON.parse(data);
	console.log(obj);
	client.end();
});