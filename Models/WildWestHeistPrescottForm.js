const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let WildWestHeistPrescottForm = new Schema({
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
    date: {
        type: Date
    },
    refund: {
        type: String
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

module.exports = mongoose.model("WildWestHeistPrescottForm", WildWestHeistPrescottForm);