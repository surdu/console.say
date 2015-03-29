(function () {
  var hostname = window.location.protocol + '//' + window.location.hostname + ":" + window.location.port;
  var socket = io(hostname);

  console.log("Connecting ...");

  socket.emit('join');
  
  socket.on("welcome", function (data) {
    console.log("Connected with name:", data.name);
    var name = data.name;

    socket.on('broadcast', function (data) {
      console.log(data);
      if (data.name !== name)
      {
        console.log(data.name + ":", data.msg);
      }
    });

    function say(msg) {
      socket.emit('say', { name: name, msg: msg });
      return name + ": " + msg;
    }

    window.say = say;
  })


})();
