let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BookGhostRidersScottsdale = new Schema({
    Banner: [
        {
            title: {
                type: String
            },
            banner: {
                type: String
            },
            subtitle1: {
                type: String
            },
            subtitle2: {
                type: String
            },
            subtitle3: {
                type: String
            }
        }
    ],
    Booking_Details: [
        {
            title: {
                type: String
            }
        }
    ],
    Continue_Section: [
        {
            title: {
                type: String
            },
            logo1: {
                type: String
            },
            logo2: {
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

module.exports = mongoose.model("BookGhostRidersScottsdale", BookGhostRidersScottsdale);