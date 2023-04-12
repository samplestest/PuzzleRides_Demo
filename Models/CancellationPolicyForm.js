const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CancellationPolicyForm = new Schema({
    // title: {
    //     type: String
    // },
    // subtitle: {
    //     type: String
    // },
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    cancellationDetail: {
        type: String
    },
    file: {
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

module.exports = mongoose.model("CancellationPolicyForm", CancellationPolicyForm);