let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let OurPuzzleMaster = new Schema({
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
    images: [
        {
            image: {
                type: String
            },
            title: {
                type: String
            },
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

module.exports = mongoose.model("OurPuzzleMaster", OurPuzzleMaster);