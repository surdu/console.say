(function () {
  "use strict";

  /* make sure console.log is here, case in point being IE with the dev
     console not opened */

  if (!window.console) {
    window.console = {};
  }

  if (!window.console.log) {
    window.console.log = function () {
    }
  }

  if (!window.console.group) {
    window.console.group = window.console.log;
    window.console.groupEnd = function () {
    }
  }

  var socket = io();
  var defaultStyle = "color: gray; font-style: italic; font-weight: bold;";
  var chatStyle = "color: blue; font-weight: bold;";
  var joinStyle = "color: green; font-weight: bold;";
  var helpMessage = "say.username = '<username>' - change your user name";

  function log(text, style) {
    if (style) {
      var text = "%c"+text;
      console.log(text, style);
    }
    else {
      console.log(text);
    }
  }

  console.group("Welcome to console.say chat");
  log("Type say('<some text>') and press enter in order to chat with other people");
  log("Type say.help for more options");
  console.groupEnd();

  log("Connecting ...", defaultStyle);

  socket.emit('join');

  socket.on("welcome", function (data) {

    socket.on('broadcast', function (data) {
      if (data.name !== say.username) {
        log(data.name + ": " + data.msg, chatStyle);
      }
    });

    socket.on("joined", function (data) {
      if (data.name !== say.username) {
        log(data.name + " joined", joinStyle);
      }
    })

    function say(msg) {
      socket.emit('say', { name: say.username, msg: msg });
      return say.username + ": " + msg;
    }

    say.username = data.name;
    say.help = helpMessage;

    window.say = console.say = say;

    log("Connected with name: " + say.username, defaultStyle);
  })


})();
