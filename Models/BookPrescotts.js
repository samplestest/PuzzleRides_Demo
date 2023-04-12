let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BookPrescotts = new Schema({
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
    Prescott_Adventure: [
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
            },
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
            description: {
                type: String
            },
            logo1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            logo2: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            button_logo: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Ghost_Riders: [
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
            logo1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            logo2: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            button_logo: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Hijack_By_Science: [
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
            logo1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            logo2: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            button_logo: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Pirate_Adventure: [
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
            logo1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            logo2: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            button_logo: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Lost_In_Time: [
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
            logo1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            logo2: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            button_logo: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Double_Rides: [
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
            logo1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            logo2: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            },
            button_logo: {
                type: String
            },
            button: {
                type: String
            }
        }
    ],
    Our_Pub_Crawls: [
        {
            title: {
                type: String
            },
            image: {
                type: String
            },
            logo: {
                type: String
            },
            description: {
                type: String
            },
            button: {
                type: String
            },
        }
    ],
    Rides_Info: [
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
            image3: {
                type: String
            },
            description: {
                type: String
            },
        }
    ],
    Pickup_Drop: [
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
            logo1: {
                type: String
            },
            Key1: {
                type: String
            },
            value1: {
                type: String
            },
            logo2: {
                type: String
            },
            key2: {
                type: String
            },
            value2: {
                type: String
            }
        }
    ],
    Booking_Info: [
        {
            title: {
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

module.exports = mongoose.model("BookPrescotts", BookPrescotts);