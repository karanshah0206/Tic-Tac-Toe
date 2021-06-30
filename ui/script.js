var socket = io();
var gameboard = [0,0,0,0,0,0,0,0,0];
var myType = 0;
var myTurn = false;

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
    myTurn = isMyTurn;
});

// Winner
socket.on("winner", () => {
    document.getElementById("winner").classList.remove("hidden");
    document.getElementById("gameboard").classList.add("hidden");
});

// Loser
socket.on("loser", () => {
    document.getElementById("loser").classList.remove("hidden");
    document.getElementById("gameboard").classList.add("hidden");
});

// Event Listeners For Gameboard
for (let i = 0; i < 9; i++) { document.getElementById((i+1).toString()).addEventListener("click", () => { makeMove(i); }); }

// Make Move
function makeMove(loc) {
    if(myTurn) {
        if (gameboard[loc] != "1" && gameboard[loc] != "2") {
            socket.emit("move", [loc, myType]);
        } else {
            makeAlert("Choose An Empty Cell!");
        }
    } else { makeAlert("Not Your Turn!"); }
}

// Render Gameboard
function drawGameboard() {
    for (let i = 0; i < 9; i++) {
        if (gameboard[i] == 1) { document.getElementById((i+1).toString()).innerText = "X"; }
        else if (gameboard[i] == 2) { document.getElementById((i+1).toString()).innerText = "O"; }
        else { document.getElementById((i+1).toString()).innerText = ""; }
    }
}

// Makes An Alert
function makeAlert(message) {
    document.getElementById("alerter").innerText = message;
    document.getElementById("alerter").classList.remove("hidden");
    setTimeout(() => { document.getElementById("alerter").classList.add("hidden"); }, 3000);
}