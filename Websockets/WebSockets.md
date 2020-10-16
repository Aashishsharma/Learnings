## WebSockets
WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection

##Socket.io
Socket.IO is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.  
It consists of 2 parts  
1. Node.js server
2. JS client library

#### Socket.io working
The client will try to establish a WebSocket connection if possible, and will fall back on HTTP long polling if not.  
You can consider the Socket.IO client as a “slight” wrapper around the WebSocket API  
Socket.IO is NOT a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.  

#### 1. Server side
1. Installation  
npm install socket.io  
2. Initialization
```javascript
// with express
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ }; // options is optional
const io = require('socket.io').listen(server);
io.on('connection', socket => { /* ... */ });
server.listen(3000);
```
3. Rooms
Are arbitrary channels that sockets can join and leave.  
```javascript
// joining a room
io.on('connection', socket => {
  socket.join('some room');
});
// broadcasting message to a room
io.to('some room').emit('some event');

// disconnect
socket.on('disconnect', () => {
  socket.leave('some room');
});
```

#### 2. Client side
1. Installation and Initialization
By default, the Socket.IO server exposes a client bundle at /socket.io/socket.io.js  
So no need of external library
```javascript
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io.connect();
</script>
```
You can also disbale config option in server to not expose client bundle as above  
In this case you will have to use external library on the client side

2. Initialization
```javascript

```