const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PrivacyPolicy = new Schema({
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
    privacyPolicy_Detail: [
        {
            description: {
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

module.exports = mongoose.model("PrivacyPolicy", PrivacyPolicy);