var socket = io();

// Room Full Event
socket.on("full", () => {
    alert("The room is full");
});

// Opponent Joined
socket.on("opponentJoined", () => {
    alert("An opponent has joined the game");
});

// Opponent Left
socket.on("opponentLeft", () => {
    alert("Your opponent left the game");
});