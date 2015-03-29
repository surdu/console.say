var fs = require("fs");

module.exports = {

  chattersCount: 0,

  listen: function (server) {
    var self = this;
    var io = require('socket.io').listen(server);

    var evs = server.listeners('request').slice(0);
    server.removeAllListeners('request');
    server.on("request", function (req, res) {
      if (req.url === "/console.say/client.js")
      {
        var content = fs.readFileSync(require.resolve("./client.js"));
        res.setHeader('Content-Type', 'application/javascript');
        res.writeHead(200);
        res.end(content);
      }
      else
      {
        for (var i = 0; i < evs.length; i++) {
          evs[i].call(server, req, res);
        }
      }
    })

    io.on("connection", function (socket) {

      socket.on("join", function (data) {
        self.chattersCount ++;
        socket.emit("welcome", {name: "User_" + self.chattersCount})
      });

      socket.on("say", function (data) {
        socket.emit("broadcast", {name: data.name, msg: data.msg});
      });

      socket.on("disconnect", function (data) {
        console.log('disconnected:', data);
      });
    });
  }
}
