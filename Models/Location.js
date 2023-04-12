let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Location = new Schema({
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
    Scottsdale_Prescott: [
        {
            image: {
                type: String
            },
            title: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Columbus: [
        {
            image: {
                type: String
            },
            title: {
                type: String
            },
            button1: {
                type: String
            },
            button2: {
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

module.exports = mongoose.model("Location", Location);