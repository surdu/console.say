# console.say

A simple chat for your developer tools / firebug console. The server of the chat is written for node.js.

## Server

First, you need to install the `console.say` node.js package with the following command:

`npm install console.say`

Then you need to bind console.say to yout http server like so:

```JavaScript
require('console.say').bind(http);
```

So, your server code should look something like this:

```javascript
var app = require('express')();
var http = require('http').Server(app);

// serving the client page
app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

require('console.say').bind(http);
```

## Client

On the client page you will need to add the following two lines:

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/console.say/client.js"></script>

```

As you can see, both `socket.io` and `console.say` serve their own client scripts.

In the server example above, we serve to the client a file called `index.html`.

The content of `index.html` is the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>console.say</title>
  </head>
  <body>
    <h1>Hey!</h1>
    <p>All the magic is in the console. Press CTRL+Shift+i on PC or CMD+ALT+i on Mac to open the console.</p>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/console.say/client.js"></script>
  </body>
</html>

```

N-joy :wink:
