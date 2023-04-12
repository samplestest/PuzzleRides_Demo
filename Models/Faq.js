const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Faq = new Schema({
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
    Rides_Info: [
        {
            title: {
                type: String
            },
            que: [{
                question: {
                    type: String
                },
                answer: {
                    type: String
                }
            }]
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

module.exports = mongoose.model("Faq", Faq);