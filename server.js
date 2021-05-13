const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const usersRouter = require("./back-end/routes/users");
const blocksRouter = require('./back-end/routes/blocks');
const eventsRouter = require('./back-end/routes/events');

require('dotenv').config();

// our localhost port
const port = process.env.PORT || 3000;
const app = express()
app.use(cors());
app.use(express.json());
// our server instance
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require("./back-end/config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./back-end/config/passport")(passport);
// Routes
app.use("/users", usersRouter);
app.use('/blocks', blocksRouter);
app.use('/events', eventsRouter);
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
