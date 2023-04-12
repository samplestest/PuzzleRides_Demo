let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let WhatArePuzzle = new Schema({
    image: {
        type: String
    },
    video: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
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

module.exports = mongoose.model('WhatArePuzzle', WhatArePuzzle);