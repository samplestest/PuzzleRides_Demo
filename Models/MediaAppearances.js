let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MediaAppearances = new Schema({
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
    Videos: [
        {
            video: {
                type: String
            },
            title: {
                type: String
            },
            subtitle: {
                type: String
            }
        }
    ],
    Featured: [
        {
            title: {
                type: String
            },
            description: {
                type: Array
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

module.exports = mongoose.model("MediaAppearances", MediaAppearances);