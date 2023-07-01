/*
?? can i use the old params ? in a server app instead of routes with : params
2- send the user to the lobby to take the room id then redirect him to the route of the room and render the room
?? can i move direct between html pages without going to route in server to render it if i'm using view engine or i have to create a truly html page not .ejs
*/

const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);

const { v4: uuidV4 } = require('uuid');

// set the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  // res.render("lobby", { roomId: uuidV4() });
  res.render('lobby');
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

/*
 */
const expressServer = app.listen(4000, (err) => {
  if (!err) console.log('server start at port 4000....');
});

//the io must created from the server you are working on(whatever it was express server comes from app.listen or httpserver comes from http.createServer())
const io = require('socket.io')(expressServer);
io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    console.log('rooms before any room: ', socket.rooms);
    socket.join(roomId);
    let user2_ID = socket.id; //this is user_1 and user_2 but only user_2 will receive the 'memberJoined' event so i named it user_2
    socket.to(roomId).emit('MemberJoined', user2_ID); // can i change it to send private message to that specific user?? no as the user joined may be myself so i only want to emit this event to other users joined

    console.log('user: ', user2_ID, 'joined the room'); //actually user1 and user2 will be loged here but in the previous line only user2_ID will be send
  });

  socket.on('send-message', (message, receiver) => {
    let sender = socket.id;
    io.to(receiver).emit('MessageSent', message, sender); //send the message to the user with the MemberId sent in the event
    console.log('\n', socket.id, ' send a message');
  });

  socket.on('disconnecting', (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('MemberLeft', socket.id); //i could send also the room_id direct and pass it to socket.to() but if the user joined room the room_id is held in the socket.rooms so no need to resend it.
      }
    }
  });
});
