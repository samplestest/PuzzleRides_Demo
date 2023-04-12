const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ContactUs = new Schema({
    Banner: [
        {
            title: {
                type: String
            },
            subtitle: {
                type: String
            },
            banner: {
                type: String
            }
        }
    ],
    Leave_Us_Review: [
        {
            title: {
                type: String
            },
            reviews: [{
                logo: { type: String },
                type: { type: Array }
            }]
        }
    ],
    Social_Media: [
        {
            title: {
                type: String
            },
            media: [
                {
                    type: { type: String },
                    image: { type: Array }
                }
            ]
        }
    ],
    Drop_Us_Line: [
        {
            title: {
                type: String
            },
            button: {
                type: String
            },
        }
    ],
    Call_Text: [
        {
            title: {
                type: String
            },
            subtitle: {
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

module.exports = mongoose.model("ContactUs", ContactUs);