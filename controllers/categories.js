const Category = require('../models/categorie');

// Create a category or subcategory
exports.createCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la catégorie est requis",
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Catégorie existante",
      });
    }

    const category = new Category({
      name,
      parentCategory,
    });
    await category.save();

    res.status(201).json({
      success: true,
      message: "Catégorie créée avec succès",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categoriesWithSubcategories = await Category.aggregate([
      // Match only parent categories (i.e., where parentCategory is null)
      { $match: { parentCategory: { $eq: null } } },
      // Perform a left outer join to include subcategories
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'parentCategory',
          as: 'subcategories',
        },
      },
      // Project the desired fields (i.e., filter out unnecessary fields)
      {
        $project: {
          _id: 1,
          name: 1,
          subcategories: {
            _id: 1,
            name: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: categoriesWithSubcategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories',
      error: error.message,
    });
  }
};
// Get a category by ID (including its subcategories)
exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId)
      .populate({
        path: 'subcategories',
        model: 'Category',
        populate: {
          path: 'parentCategory',
          model: 'Category',
        },
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Catégorie introuvable",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la catégorie",
      error: error.message,
    });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la catégorie est requis",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Catégorie introuvable",
      });
    }

    res.status(200).json({
      success: true,
      message: "Catégorie mise à jour avec succès",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de la catégorie",
      error: error.message,
    });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Catégorie introuvable",
      });
    }

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Catégorie supprimée avec succès",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la catégorie",
      error: error.message,
    });
  }
};