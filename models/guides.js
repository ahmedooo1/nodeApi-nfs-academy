const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' // Référence au modèle Category
    },

    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number},
    userId: { type: String }

});

module.exports = mongoose.model('Thing', thingSchema);