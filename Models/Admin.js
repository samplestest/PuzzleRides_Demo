let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Admin = new Schema({
    email: {
        type: String
    },
    fullName: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    mobile: {
        type: String
    },
    invite: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isAccept: { type: Boolean, default: false },
    addedBy: { type: Schema.ObjectId, ref: 'Admin' },
    accessToken: { type: String, trim: true, index: true, sparse: true, default: null },

}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', Admin);