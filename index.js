const { http, https } = require('follow-redirects');
function fetch(data) { require('node-fetch')(data.DATA_URL, data); };

const io = require("socket.io-client")("wss://socket.boticord.top");
io.on('connect', () => {
    console.log("* Connected to socket");
    io.emit('login', { token: process.env.TOKEN });
});

io.on('http_request', fetch);
io.on('unshorten_link', data => {
    // https://www.npmjs.com/package/follow-redirects
    const request = https.request({
        host: data.host,
        path: data.path,
    }, response => io.emit(`unshorten_link-${data.id}`, response.responseUrl));
    request.end();
});
