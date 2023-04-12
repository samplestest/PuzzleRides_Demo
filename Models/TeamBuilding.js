let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let TeamBuilding = new Schema({
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
    Team_Activities: [
        {
            title: {
                type: String
            },
            image1: {
                type: String
            },
            image2: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    Scottsdale_Prescott_Activities: [
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
    Team_Activities_In_Columbus: [
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

module.exports = mongoose.model("TeamBuilding", TeamBuilding);