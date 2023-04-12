let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BacheloretteParties = new Schema({
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
    Our_Pub_Crawl: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            subtitle: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    Cost: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            subtitle: {
                type: String
            },
            description: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Location: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    Our_Traditional_Puzzle: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            subtitle: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    BacheloretteParties_Rides: [
        {
            image: { type: Array }
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

module.exports = mongoose.model("BacheloretteParties", BacheloretteParties);