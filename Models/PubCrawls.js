let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PubCrawls = new Schema({
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
    Our_Local_Bars: [
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
            description1: {
                type: String
            },
            description2: {
                type: String
            },
            description3: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Pubs_Puzzles: [
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
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            Key3: {
                type: String
            },
            key4: {
                type: String
            },
            value4: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Our_Rock: [
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
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            key2: {
                type: String
            },
            key3: {
                type: String
            },
            value3: {
                type: String
            },
            key4: {
                type: String
            },
            value4: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Our_Murder: [
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
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            key3: {
                type: String
            },
            key4: {
                type: String
            },
            value4: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    soph_and_fun_pub: [
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
            description1: {
                type: String
            },
            description2: {
                type: String
            }
        }
    ],
    Puzzle_Type: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            types: [{
                title: { type: String },
                description: { type: String }
            }]
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
            description: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Scottsdale_Prescott_Bars: [
        {
            title: {
                type: String
            },
            bar: [{
                barType: {
                    type: String
                },
                barName: {
                    type: Array
                },
                button: {
                    type: String
                }
            }]
        }
    ],
    Faq: [
        {
            question: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ],
    Want_To_Know_More: [
        {
            title: {
                type: String
            },
            videoData: [{
                video: {
                    type: String
                },
                subtitle: {
                    type: String
                },
                description: {
                    type: String
                },
            }]
        }
    ],
    Coupleyfitt: [
        {
            title: {
                type: String
            },
            subtitle: {
                type: String
            },
            button1: {
                type: String
            },
            description1: {
                type: String
            },
            description2: {
                type: String
            },
            button2: {
                type: String
            },
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

module.exports = mongoose.model("PubCrawls", PubCrawls);