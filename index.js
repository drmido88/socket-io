var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {


  socket.on('join', function (name) {
    socket.name = name;
    console.log(socket.name + ' connected');
  });

  socket.on('chat message', function (msg) {
    console.log( socket.name  +' says:' + msg);
    io.emit('chat message',socket.name, msg);
  });

  socket.on('disconnect', function (socket) {
    console.log('client disconnected');
  });
});



http.listen(3000, function () {
  console.log('listening on *:3000');
});
