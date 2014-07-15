var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('*.js', function(req, res){
	res.sendfile("public/js/"+req.path);
});

app.get('*.html', function(req,res){
	res.sendfile("public/views/"+req.path);
});

app.get('*.css', function(req, res){
	res.sendfile('public/css/'+req.path);
});

io.on('connection', function (socket) {
  socket.on("play", function(note){
		console.log(note);
		socket.broadcast.emit("play", note);
	});
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});
