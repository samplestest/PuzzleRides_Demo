let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BestThingToDo = new Schema({
    title: {
        type: String
    },
    button1: {
        type: String
    },
    button2: {
        type: String
    },
    image1: {
        type: String
    },
    image2: {
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

module.exports = mongoose.model('BestThingToDo', BestThingToDo);