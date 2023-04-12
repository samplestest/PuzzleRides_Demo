let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BookScottsdalePubCrawlsScottsdale = new Schema({
    Select_Activity: [
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

module.exports = mongoose.model("BookScottsdalePubCrawlsScottsdale", BookScottsdalePubCrawlsScottsdale);