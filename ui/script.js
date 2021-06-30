var socket = io();

// Room Full Event
socket.on("full", () => {
    socket.disconnect();
    document.getElementById("roomFull").classList.remove("hidden");
});

// First Player In Room
socket.on("firstJoined", () => {
    document.getElementById("waitingForOpponent").classList.remove("hidden");
});

// Second Player In Room
socket.on("secondJoined", () => {
    document.getElementById("gameboard").classList.remove("hidden");
});

// Opponent Joined
socket.on("opponentJoined", () => {
    document.getElementById("opponentDisconnected").classList.add("hidden");
    document.getElementById("waitingForOpponent").classList.add("hidden");
    document.getElementById("gameboard").classList.remove("hidden");
});

// Opponent Left
socket.on("opponentLeft", () => {
    document.getElementById("opponentDisconnected").classList.remove("hidden");
    setTimeout(() => { document.getElementById("opponentDisconnected").classList.add("hidden"); }, 5000);
    document.getElementById("waitingForOpponent").classList.remove("hidden");
    document.getElementById("gameboard").classList.add("hidden");
});