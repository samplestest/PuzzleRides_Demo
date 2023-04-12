let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AffiliateProgram = new Schema({
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
    Promoting_Us: [
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
    images_Info: [
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
    Join_Our_Affiliate: [
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
            button: {
                type: String
            }
        }
    ],
    AffiliateProgramSignup: [
        {
            title: {
                type: String
            },
            subtitle: {
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

module.exports = mongoose.model("AffiliateProgram", AffiliateProgram);