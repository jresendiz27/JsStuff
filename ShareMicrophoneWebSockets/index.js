  var http = require("http"),
  url = require("url"),
  iolib = require("socket.io"),
  fs = require("fs"),
  error404 = function error404(response) {
    response.writeHead(400, {'Content-Type': 'text/html'});
    response.write("Something went wrong, check log for further information");
    response.end();
  },
  toType = function(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  },
  server = http.createServer(function createServer(request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
      case "/":
        console.log("Hello world");
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write("Hello World from Node server.");
        response.end();
        break;
      case "/broadcast.html":
        fs.readFile(__dirname + path, function readFile(err, data) {
          if(err) {
            console.error(err);
            error404(response);
          } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
          }
        });
        break;
      case "/receive.html":
        fs.readFile(__dirname + path, function readFile(err, data) {
          if(err) {
            console.error(err);
            error404(response);
          } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
          }
        });
        break;
      default:
        error404(response);
    }
  });
server.listen(8888, function serverStarted() {
  console.log("Server started at 8888");
});
var io = iolib.listen(server);
io.sockets.on('connection', function connected(socket) {
  socket.on('microphoneData', function microphoneData(data) {
    socket.broadcast.emit('streaming', data);
    //socket.emit('streaming', {'data':"OK"});
  });
});
