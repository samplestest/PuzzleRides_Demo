const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RidesBooking = new Schema({
    ridesId: {
        type: Schema.Types.ObjectId
    },
    quantity: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    eventId: {
        type: String
        // type: Schema.Types.ObjectId
    },
    date: {
        type: Date
    },
    refund: {
        type: Boolean,
        default: false
    },
    hotel_pickUp_dropOff: {
        type: String
    },
    insider_Tour: {
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

module.exports = mongoose.model("RidesBooking", RidesBooking);