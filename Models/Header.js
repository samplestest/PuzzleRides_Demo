let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Header = new Schema({
    name: {
        type: String
    },
    link: {
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

module.exports = mongoose.model('Header', Header);