var socket = io();

// Room Full Event
socket.on("full", () => {
    alert("The room is full");
});