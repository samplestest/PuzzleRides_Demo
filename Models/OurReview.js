let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let OurReview = new Schema({
    image: {
        type: String
    },
    description: {
        type: String
    },
    name: {
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

module.exports = mongoose.model('OurReview', OurReview);