const { type } = require("@hapi/joi/lib/extend");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CancellationPolicy = new Schema({
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
    Cancellation_Info: [
        {
            description: {
                type: String
            }
        }
    ],
    Request_For_Refund: [
        {
            title: {
                type: String
            },
            subtitle: {
                type: String
            },
            button: {
                type: String
            },
        }
    ],
    Cancellation_Protection_Info: [
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

module.exports = mongoose.model("CancellationPolicy", CancellationPolicy);