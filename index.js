function fetch(data) { require('node-fetch')(data.DATA_URL, data); };
const io = require("socket.io-client")("wss://socket.boticord.top");
io.on('connect', () => {
    console.log("* Connected to socket");
    io.emit('login', { token: process.env.TOKEN });
});

io.on('http_request', fetch);
