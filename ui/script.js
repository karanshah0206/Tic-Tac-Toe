var socket = io();

// Room Full Event
socket.on("full", () => {
    alert("The room is full");
});

// Opponent Left
socket.on("opponentLeft", () => {
    alert("Your opponent left the game");
});