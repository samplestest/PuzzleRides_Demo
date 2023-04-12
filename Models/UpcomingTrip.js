const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UpcomingTrip = new Schema({
    ridesId: {
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date
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

module.exports = mongoose.model("UpcomingTrip", UpcomingTrip);