const { Schema, model } = require('mongoose');

const messageSchema = new Schema ({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('message', messageSchema);