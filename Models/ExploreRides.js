let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ExploreRides = new Schema({
    image: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    button: {
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

module.exports = mongoose.model('ExploreRides', ExploreRides);