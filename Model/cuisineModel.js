const mongoose = require("mongoose");


// Create Cuisine Schema

const cuisineSchema = mongoose.Schema({
    cuisineTypes: {
        african: {type: Boolean},
        japanese: {type: Boolean},
        european: {type: Boolean},
        chinese: {type: Boolean},
        indian: {type: Boolean},
    },
    chineseCuisine: [
        {cantonese: {type: String}},
        {shandong: {type: String}},
        {sichuan: {type: String}},

    ],
    order: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }     

});

cuisineModel = mongoose.model("cuisineModel", cuisineSchema);

module.exports = cuisineModel;

