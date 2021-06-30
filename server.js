// Setting Up Server
const port = 80;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static("ui"));
server.listen(port, () => { });

// Connection Management
var peerCount = 0;
io.on("connection", (socket) => {
    peerCount++;

    // Room Full
    if (peerCount > 2) { socket.emit("full"); }

    // Disconnected
    socket.on("disconnect", () => {
        peerCount--;
        if (peerCount == 1) { socket.broadcast.emit("opponentLeft"); }
        if (peerCount == 0) { /* TODO: Clear Game Board */ }
    });
});