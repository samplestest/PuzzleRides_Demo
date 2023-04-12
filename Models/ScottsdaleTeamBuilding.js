let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ScottsdaleTeamBuilding = new Schema({
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
            image: {
                type: String
            },
            video: {
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
    Our_Reviews: [
        {
            title: {
                type: String
            },
            review: [{
                description1: {
                    type: String
                },
                subtitle1: {
                    type: String
                },
                Ratings: [{
                    key: { type: String },
                    value: { type: String },

                }],
                subtitle2: {
                    type: String
                },
                description2: {
                    type: String
                }
            }]
        }
    ],
    image_section: [
        {
            image: { type: String }
        }
    ],
    Wild_West_Heist: [
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
            button: {
                type: String
            },
            description2: {
                type: String
            },
        }
    ],
    Copper_Canyon: [
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
            button: {
                type: String
            },
            description3: {
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
            Key3: {
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
            description: {
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
        }
    ],
    Scottsdale_Rides: [
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

module.exports = mongoose.model("ScottsdaleTeamBuilding", ScottsdaleTeamBuilding);