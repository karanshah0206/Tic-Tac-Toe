// Init
var date = new Date();
const express = require('express');
const app = express();
const server = app.listen(3000);
const socket = require('socket.io');
const io = socket(server);
var playerCounter = 0;
var p1, p1n, p2, p2n;

// Access Client Source
app.use(express.static('public'));

// Connection
io.sockets.on('connection', (newConnetion));

// Console Declaration
console.log("All Dates Provided In [YYYY/MM/DD] Format. All Times Provided in IST (Indian Standard Time).")
console.log("============================================================\n" + "Server Started On " + getDateTime() + "\n============================================================");

// Functions
function newConnetion(socket) {
    console.log("Connected: Socket ID '" + socket.id + "' On " + getDateTime());
    socket.on('readyMsg', (playerName) => {
        playerCounter++;
        if (playerCounter == 1) {
            p1 = socket.id;
            p1n = playerName;
            console.log("Started Search: Player Named '" + playerName + "' On Player Count '" + playerCounter +"' With Socket ID '" + p1 + "' On " + getDateTime());
        }
        else if (playerCounter == 2) {
            p2 = socket.id;
            p2n = playerName;
            socket.emit('go', {pl1: p1n, pl2: p2n});
            socket.broadcast.to(p1).emit('go', {pl1: p1n, pl2: p2n});
            console.log("Started Search: Player Named '" + playerName + "' On Player Count '" + playerCounter + "' With Socket ID '" + p2 + "' On " + getDateTime());
            console.log("============================================================\nSession Starts On " + getDateTime());
        } else {
            socket.emit('latecomer');
            playerCounter--;
        }
    })
    socket.on('disconnect', () => {
        console.log("Disconnected: Socket ID '" + socket.id + "' On " + getDateTime());
        if(socket.id == p1 || socket.id == p2) {
            playerCounter--;
            socket.broadcast.to(p1).emit('disconnected');
            socket.broadcast.to(p2).emit('disconnected');
            playerCounter = 0;
        }
    })
    socket.on('disconMsg', () => {
        console.log("Session Ends On " + getDateTime() + "\n============================================================");
    })
}

function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + " At " + hour + ":" + min + ":" + sec + ".";
}