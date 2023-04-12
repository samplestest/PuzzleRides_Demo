let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AsSeenOn = new Schema({
    title: {
        type: String
    },
    image: {
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

module.exports = mongoose.model('AsSeenOn', AsSeenOn);