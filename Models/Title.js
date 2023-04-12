let mongoose = require("mongoose");
let Schema = mongoose.Schema

let title = new Schema({
    team_building_title: {
        type: String,
        default: ''
    },
    team_building_subtitle: {
        type: String,
        default: ''
    },
    Our_Review: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('title', title);