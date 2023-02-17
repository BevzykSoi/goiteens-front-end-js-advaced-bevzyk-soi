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

            callback({
                status: 200,
                message: 'OK',
                data: user,
            });
        } catch (error) {
            callback({
                status: 500,
                message: 'Server error',
                data: error.message,
            });
        }
    };

    async function onMessageCreate(text, userId) {
        const message = await Message.create({
            text,
            user: userId,
        });

        io.emit("create new message", await message.populate({
            path: "user",
        }));
    }

    socket.on("login", onLogin);
    socket.on("create new message", onMessageCreate);
}