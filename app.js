var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var cors = require('cors')
const path = require('path')

const members = require('./User')
const messages = require('./PrivateMessage')
const groups = require('./GroupMessage')

const userRouter = require('./UserRoutes')
const groupMessageRouter = require('./GroupMessageRoutes')
const privateMessageRouter = require('./PrivateMessageRoutes')

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, '/')))
app.use(cors())
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res) => {
  res.send("Chat server running...")
})

app.get("/home.html", (req, res) => {
  res.sendFile(__dirname + '/home.html')
})


//Declare MongoDB Schemas
var Message = mongoose.model('Message', {
  username: String,
  message: String,
  room: String
})



var db = 'mongodb+srv://ieo:vision2020@cluster0.wwc5r.mongodb.net/?retryWrites=true&w=majority'

var message;

app.post('/messages', (req, res) => {

  message = new Message(req.body);

  message.save((err) => {
    if (err) {
      console.log(err)
    }

    res.sendStatus(200);
  })
})


app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
})


const users = [];

io.on('connection', (socket) => {

  console.log(`User Connected: ${socket.id}`)


  socket.emit("situation", ({ username: '', message: `Welcome` }))

  socket.broadcast.emit("joinRoom", ({ username: `User Connected: ${users[0]}`, message: '' }))



  //Get chat message
  socket.on('userInfo', ({ username, room, message }) => {
    users.push(username)

    socket.join(room)

    socket.broadcast.to(room).emit("joinRoom", ({ username, room, message }))

    socket.emit("joinRoom", ({ username, room, message }))


  });

  socket.on("disconnect", () => {
    io.emit("situation", ({ username: '', message: `A user Left` }))
  })

})







mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('mongodb connection', err);
  } else {
    console.log('Database successfully connected');
  }
})



app.use(userRouter);
app.use(groupMessageRouter);
app.use(privateMessageRouter);

server.listen(5000, () => {
  console.log('server is running on port', server.address().port);
});



members.create(
  {
    "username": "me",
    "firstname": "myself",
    "lastname": "mine",
    "password": "pass"
  }
)
messages.create(
  {
    "from_user": "me",
    "to_user": "chief",
    "message": "right now",
    "date_sent": ""
  }
)
groups.create(
  {
    "from_user": "me",
    "room": "chief",
    "message": "right now",
    "date_sent": ""
  }
)