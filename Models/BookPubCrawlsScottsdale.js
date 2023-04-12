let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BookPubCrawlsScottsdale = new Schema({
    Booking_Details: [
        {
            title: {
                type: String
            }
        }
    ],
    Continue_Section: [
        {
            logo1: {
                type: String
            },
            logo2: {
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

module.exports = mongoose.model("BookPubCrawlsScottsdale", BookPubCrawlsScottsdale);