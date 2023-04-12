let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Banner = new Schema({
    banner: {
        type: String
    },
    title: {
        type: String
    },
    button1: {
        type: String
    },
    button2: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', Banner);