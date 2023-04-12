const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GiftCards = new Schema({
    Banner: [
        {
            title: {
                type: String
            },
            banner: {
                type: String
            }
        }
    ],
    Gift: [
        {
            title: {
                type: String
            },
            subtitle: {
                type: String
            },
            logo: {
                type: String
            },
            image1: {
                type: String
            },
            image2: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
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

module.exports = mongoose.model("GiftCards", GiftCards);