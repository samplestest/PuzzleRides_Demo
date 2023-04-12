let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PrescottTeamBuilding = new Schema({
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
    TeamBuilding_Activities: [
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
    Puzzle_Relays: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            description1: {
                type: String
            },
            description2: {
                type: String
            },
            description3: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            Key2: {
                type: String
            },
            value2: {
                type: String
            },
            Key3: {
                type: String
            },
            value3: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Puzzle_Routes: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            description1: {
                type: String
            },
            description2: {
                type: String
            },
            description3: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            Key2: {
                type: String
            },
            value2: {
                type: String
            },
            Key3: {
                type: String
            },
            value3: {
                type: String
            },
            button: {
                type: String
            },
            description4: {
                type: String
            }
        }
    ],
    Puzzle_Pub_Crawls: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            description1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            Key2: {
                type: String
            },
            value2: {
                type: String
            },
            key3: {
                type: String
            },
            value3: {
                type: String
            },
            button: {
                type: String
            },
            description2: {
                type: String
            }
        }
    ],
    Tournament_Rides: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            description1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            Key2: {
                type: String
            },
            value2: {
                type: String
            },
            key3: {
                type: String
            },
            value3: {
                type: String
            },
            button: {
                type: String
            },
            description2: {
                type: String
            }
        }
    ],
    Prescott_Rides: [
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

module.exports = mongoose.model("PrescottTeamBuilding", PrescottTeamBuilding);