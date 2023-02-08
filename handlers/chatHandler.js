/**
 * @param {import('socket.io').Server} io 
 * @param {import('socket.io').Server} socket 
 */
module.exports = (io, socket) => {
    function newUserConnected(username) {
        socket.broadcast.emit("New user connected", username);
    }

    socket.on("New user connected", newUserConnected)
}