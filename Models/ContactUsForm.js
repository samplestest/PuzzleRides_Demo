const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ContactUsForm = new Schema({
    // title: {
    //     type: String
    // },
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    // button: {
    //     type: String
    // },
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

module.exports = mongoose.model("ContactUsForm", ContactUsForm);