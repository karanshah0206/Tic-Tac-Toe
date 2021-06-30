// Setting Up Server
const port = 80;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
server.listen(port, () => { });

// Serve Frontend
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/ui/");
});

// Connection Management
io.on("connection", (socket) => {
    console.log("User connected on socket " + socket);
});