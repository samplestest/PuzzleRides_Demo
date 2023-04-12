let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RidesInfo = new Schema({
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    title: {
        type: String
    },
    subTitle: {
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

module.exports = mongoose.model('RidesInfo', RidesInfo);