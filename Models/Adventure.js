let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Adventure = new Schema({
    title: {
        type: String
    },
    description: {
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

module.exports = mongoose.model('Adventure', Adventure);