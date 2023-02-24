const User = require("../models/User");
const Message = require("../models/Message");

/**
 * @param {import('socket.io').Server} io 
 * @param {import('socket.io').Server} socket 
 */
module.exports = (io, socket) => {
    async function onLogin(username, callback) {
        try {
            let user = await User.findOne({
                username,
            });
    
            if (!user) {
                user = await User.create({
                    username,
                });
            }

            const users = await User.find();
            const messages = await Message.find().populate("user");

            callback({
                status: 200,
                message: 'OK',
                data: {
                    authUser: user,
                    users,
                    messages,
                },
            });
        } catch (error) {
            callback({
                status: 500,
                message: 'Server error',
                data: error.message,
            });
        }
    };

    async function onMessageCreate(text, userId, cb) {
        let message = await Message.create({
            text,
            user: userId,
        });
        message = await message.populate('user');

        cb({
            status: 200,
            data: message,
        });

        socket.broadcast.emit("create new message", message);
    }

    async function onTypingMessage(username) {
        socket.broadcast.emit('typing message', username);
    }

    socket.on("login", onLogin);
    socket.on("create new message", onMessageCreate);
    socket.on("typing message", onTypingMessage);
}