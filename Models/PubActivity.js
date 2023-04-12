const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PubActivity = new Schema({
    refId: {
        type: Schema.Types.ObjectId,
        // ref: "PubCrawls",
        default: null
    },
    subRefId: {
        type: Schema.Types.ObjectId,
        default: null
    },
    typeId: {
        type: Schema.Types.ObjectId,
        default: null
    },
    image: {
        type: String
    },
    title1: {
        type: String
    },
    title2: {
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

module.exports = mongoose.model("PubActivity", PubActivity);