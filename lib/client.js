(function () {
  var socket = io();

  console.log("Connecting ...");

  socket.emit('join');

  socket.on("welcome", function (data) {

    socket.on('broadcast', function (data) {
      if (data.name !== say.username)
      {
        console.log("%c" + data.name + ": " + data.msg, "color: blue");
      }
    });

    socket.on("joined", function (data) {
      if (data.name !== say.username)
        console.log("%c" + data.name + " joined", "color: green");
    })

    function say(msg) {
      socket.emit('say', { name: say.username, msg: msg });
      return say.username + ": " + msg;
    }

    say.username = data.name;

    console.log("Connected with name:", say.username);

    window.say = say;
  })


})();
