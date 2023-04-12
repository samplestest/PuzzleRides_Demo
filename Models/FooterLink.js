let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let footerLink = new Schema({
    title: {
        type: String
    },
    link: {
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

module.exports = mongoose.model("footerLink", footerLink);