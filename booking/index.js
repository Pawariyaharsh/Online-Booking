
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const route = require('./route');
const socket = require('./config/socket'); 

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors());


const server = http.createServer(app);
socket.init(server); 

// Set up routes
app.use('/', route);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

