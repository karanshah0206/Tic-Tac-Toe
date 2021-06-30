var socket = io();
var gameboard = [0,0,0,0,0,0,0,0,0];
var myType = 0;

// Room Full Event
socket.on("full", () => {
    socket.disconnect();
    document.getElementById("roomFull").classList.remove("hidden");
});

// First Player In Room
socket.on("firstJoined", () => {
    document.getElementById("waitingForOpponent").classList.remove("hidden");
    myType = 1; document.getElementById("typeIndicator").innerText = "You Are: X";
});

// Second Player In Room
socket.on("secondJoined", () => {
    document.getElementById("gameboard").classList.remove("hidden");
    myType = 2; document.getElementById("typeIndicator").innerText = "You Are: O";
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
    document.getElementById("gameboard").classList.add("hidden");
    socket.disconnect();
});

// Server Returns Gameboard And Turn Indicator
socket.on("gameboard", ([serverGameboard, isMyTurn]) => {
    gameboard = serverGameboard;
    drawGameboard();
    isMyTurn ? document.getElementById("turnIndicator").innerText = "It Is Your Turn" : document.getElementById("turnIndicator").innerText = "It Is Opponent's Turn";
});

// Render Gameboard
function drawGameboard() {
    for (let i = 0; i < 9; i++) {
        if (gameboard[i] == 1) { document.getElementById((i+1).toString()).innerText = "X"; }
        else if (gameboard[i] == 2) { document.getElementById((i+1).toString()).innerText = "O"; }
        else { document.getElementById((i+1).toString()).innerText = ""; }
    }
}