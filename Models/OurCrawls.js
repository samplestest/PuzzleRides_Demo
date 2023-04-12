let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let OurCrawls = new Schema({
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    button: {
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

module.exports = mongoose.model('OurCrawls', OurCrawls);