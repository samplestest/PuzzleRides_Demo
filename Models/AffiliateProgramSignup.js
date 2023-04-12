let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AffiliateProgramSignup = new Schema({
    // title: {
    //     type: String
    // },
    // subtitle: {
    //     type: String
    // },
    bussinessName: {
        type: String
    },
    YourName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    websiteUrl: {
        type: String
    },
    streetAddress: {
        type: String
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String
    },
    stateProvice: {
        type: String
    },
    zip: {
        type: String
    },
    country: {
        type: String
    },
    code: {
        type: String
    },
    // button: {
    //     type: String
    // },
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

module.exports = mongoose.model("AffiliateProgramSignup", AffiliateProgramSignup);