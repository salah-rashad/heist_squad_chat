var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send("Node Server is running. Yay!!")
// })


io.on('connection', function (socket) {

  //Get the roomID of the user and join in a room of the same roomID
  roomID = socket.handshake.query.roomID
  socket.join(roomID);

  client.on("JOIN_ROOM", (room, nickname) => {
    socket.in(room).emit("SEND_MESSAGE", nickname + " joined room.");
  });

  //Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    socket.leave(roomID)
  });

  // Receive a message from client in a particular room
  socket.on('SEND_MESSAGE', (room, nickname, content) => {
    //Send message to only that particular room
    socket.in(room).emit('RECEIVE_MESSAGE', (room, nickname, content));
  })
});



// io.on("connection", function (client) {
//   console.log("Connected Client:: ", client);

//   client.on("joinRoom", (roomId, username) => {
//     client.join(roomId);
//     io.to(roomId).emit("sendMessage", username + " joined room " + roomId);
//   });
//   client.on(
//     "sendMessage",
//     (message, roomId, username) => {
//       io.to(roomId).emit("sendMessage", message, username);
//     }
//   );
// });


http.listen(port, function () {
  console.log('Heist Squad Chat on *:' + port);
});