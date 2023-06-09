// models/Category.js

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'  
  } 
});

CategorySchema.virtual('subcategories', {
  ref: 'Category', 
  localField: '_id',
  foreignField: 'parentCategory' 
});
module.exports = mongoose.model('Category', CategorySchema);