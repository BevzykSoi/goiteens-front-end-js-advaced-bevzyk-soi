const socket = io();

socket.emit("New user connected", `user_${socket.id}`);

socket.on("New user connected", (username) => {
    document.body.insertAdjacentHTML('afterbegin', `<h2>${username}</h2>`);
});