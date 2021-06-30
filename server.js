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
var gameboard = [0,0,0,0,0,0,0,0,0];
io.on("connection", (socket) => {
    peerCount++;

    // Room Full
    if (peerCount > 2) { socket.emit("full"); }
    // Opponent Joined
    else if (peerCount == 2) {
        socket.emit("secondJoined"); socket.broadcast.emit("opponentJoined");
        socket.emit("gameboard", [gameboard, false]);
        socket.broadcast.emit("gameboard", [gameboard, true]);
    }
    // First Player Joined
    else if (peerCount == 1) { socket.emit("firstJoined"); }

    // Player Makes A Move
    socket.on("move", ([loc, type]) => {
        gameboard[loc] = type;
        socket.emit("gameboard", [gameboard, false]);
        socket.broadcast.emit("gameboard", [gameboard, true]);
        if (checkWinner()) { socket.emit("winner"); socket.broadcast.emit("loser"); }
    });

    // Disconnected
    socket.on("disconnect", () => {
        peerCount--; gameboard = [0,0,0,0,0,0,0,0,0];
        if (peerCount == 1) { socket.broadcast.emit("opponentLeft"); }
    });
});

function checkWinner() {
    return false;
}