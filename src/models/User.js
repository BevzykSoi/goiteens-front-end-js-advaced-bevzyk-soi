const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    verificationToken: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('user', userSchema);