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
  var goneStyle = "color: orange; font-weight: bold;";

  var helpMessage = "say.username = '<username>' - change your user name";

  // Helper function to display styled text on console
  function log(text, style) {
    if (style) {
      var text = "%c"+text;
      console.log(text, style);
    }
    else {
      console.log(text);
    }
  }

  // Show welcome message
  console.group("Welcome to console.say chat");
  log("Type join('<username>') and press enter in order to join the chat, then");
  log("Type say('<some text>') and press enter in order to chat with other people");
  log("Type say.help for more options");
  console.groupEnd();

  // Instruct user to login first
  window.say = function () {
    return "Firt join chat by typing join('<username>') and press enter";

  }

  function join(username) {
    socket.emit('join', {username: username});

    return "Connecting...";
  }

  window.join = join;

  socket.on("userExists", function () {
    log("Username taken. Please try another one.", defaultStyle);
  });

  socket.on("welcome", function (data) {

    socket.on('broadcast', function (data) {
      log(data.name + ": " + data.msg, chatStyle);
    });

    socket.on("joined", function (data) {
      log(data.name + " joined", joinStyle);
    })

    socket.on("gone", function (data) {
      log(data.name + " left", goneStyle);
    })

    function say(msg) {
      socket.emit('say', { msg: msg });
      return username + ": " + msg;
    }

    say.help = helpMessage;

    window.say = console.say = say;
    log("Connected", defaultStyle);
  });

})();
