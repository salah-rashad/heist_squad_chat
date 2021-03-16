var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Node Server is running. Yay!!")
})

// io.on('connection', socket => {
//   //Get the roomID of the user and join in a room of the same roomID
//   roomID = socket.handshake.query.roomID
//   socket.join(roomID)

//   //Leave the room if the user closes the socket
//   socket.on('disconnect', () => {
//     socket.leave(roomID)
//   })

//   //Send message to only a particular user
//   socket.on('send_message', message => {
//     receiverRoomID = message.receiverRoomID
//     senderRoomID = message.senderRoomID
//     content = message.content

//     //Send message to only that particular room
//     socket.in(receiverRoomID).emit('receive_message', {
//       'content': content,
//       'senderRoomID': senderRoomID,
//       'receiverRoomID': receiverRoomID,
//     })
//   })
// });



io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId, username) => {
    socket.join(roomId);
    io.to(roomId).emit("sendMessage", username + " joined room " + roomId);
  });
  socket.on(
    "sendMessage",
    (message, roomId, username) => {
      io.to(roomId).emit("sendMessage", message, username);
    }
  );
});


http.listen(port, function () {
  console.log('Heist Squad Chat on *:' + port);
});