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
io.on("connection", (socket) => {
    // Connected
    socket.on("disconnect", () => {
        // Disconnected
    });
});