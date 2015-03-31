var fs = require("fs");

var users = [];

module.exports = {

  bind: function (server) {
    var self = this;
    var io = require('socket.io').listen(server);

    // Serve the client script
    var evs = server.listeners('request').slice(0);
    server.removeAllListeners('request');
    server.on("request", function (req, res) {
      if (req.url === "/console.say/client.js") {
        var content = fs.readFileSync(require.resolve("./client.js"));
        res.setHeader('Content-Type', 'application/javascript');
        res.writeHead(200);
        res.end(content);
      }
      else {
        for (var i = 0; i < evs.length; i++) {
          evs[i].call(server, req, res);
        }
      }
    })

    // Handle new user connection
    io.on("connection", function (socket) {

      socket.on("join", function (data) {
        if (users.indexOf(data.username) === -1) {
          socket.username = data.username;
          users.push(socket.username);
          socket.emit("welcome");
          socket.broadcast.emit("joined", {name: socket.username});
        }
        else {
          socket.emit("userExists");
        }
      });

      socket.on("say", function (data) {
        socket.broadcast.emit("broadcast", {name: socket.username, msg: data.msg});
      });

      socket.on("disconnect", function (data) {
        users.splice(users.indexOf(socket.username), 1);
        io.emit("gone", {name: socket.username});
      });
    });
  }
}
