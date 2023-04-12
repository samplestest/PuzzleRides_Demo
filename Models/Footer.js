let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Footer = new Schema({
    logo: {
        type: String
    },
    description1: {
        type: String
    },
    description2: {
        type: String
    },
    title: {
        type: String
    },
    subTitle1: {
        type: String
    },
    subTitle2: {
        type: String
    },
    preInstragamImage: {
        type: String
    },
    prefacebookImage: {
        type: String
    },
    preTikTokImage: {
        type: String
    },
    scottsInstragam: {
        type: String
    },
    scottsFacebook: {
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

module.exports = mongoose.model("Footer", Footer);