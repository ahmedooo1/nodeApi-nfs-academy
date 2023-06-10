const Thing = require('../models/guides');
const fs = require('fs');
const uploadImage = require('../utils/uploadImage');
const cloudinary = require('../config/cloudinary-config');
const Category = require('../models/categorie');
// const SubCategory = require('../models/SubCategory');
exports.createThing = async (req, res, next) => {
    const thingObject = req.body;
    delete thingObject._id;
    delete thingObject._userId;
  
    let imageUrl;
  
    if (req.file) {
      imageUrl = await uploadImage(req.file);
      if (!imageUrl) {
        return res.status(400).json({ error: 'Erreur lors de l\'upload de l\'image !' });
      }
    } else {
      imageUrl = '/images/default.jpg';
    }
  

  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl,
  });
  
  await thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch(error => res.status(400).json({ error : error.message}));
      };




      exports.modifyThing = async (req, res, next) => {
        try {
            const thing = await Thing.findOne({ _id: req.params.id });
    
            if (!thing) {
                return res.status(404).json({ error: "L'objet n'existe pas" });
            }
    
            const thingObject = req.body;
            delete thingObject._id;
            delete thingObject._userId;
    
            let imageUrl = thing.imageUrl;
    
            if (req.file) {
                imageUrl = await uploadImage(req.file);
                if (!imageUrl) {
                    return res.status(400).json({ error: 'Erreur lors de l\'upload de l\'image !' });
                }
            }
    
            const category = await Category.findById(req.body.categoryId);
            if (req.body.categoryId && !category) {
                return res.status(400).json({ error: 'Catégorie invalide' });
            }
    
            const updatedThing = {
                ...thing.toObject(),
                ...thingObject,
                imageUrl,
                category: req.body.categoryId ? category : thing.category
            };
    
            await Thing.updateOne({ _id: req.params.id }, updatedThing)
    
            res.status(200).json({ message: 'Objet modifié !' });
        } catch (error) {
            res.status(500).json({ error });
        }
    };

exports.deleteThing = async (req, res, next) => {
  const thing = await Thing.findOne({ _id: req.params.id });
  if (thing.userId != req.auth.userId) {
    return res.status(401).json({ error: 'Not authorized' }); 
  }
  
  // Supprimer l'image sur Cloudinary
  await cloudinary.uploader.destroy(thing.imageUrl); 
  
  await Thing.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'Objet supprimé !' });
}
exports.getOneThing =  (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).populate('category')
    .then(thing => {
      if (thing.subcategory) {
        thing.populate('subcategory', (err, thing) => {
          if (err) {
            res.status(404).json({ error: err });
          } else {
            res.status(200).json(thing); 
          }
        });
      } else {
        delete thing.subcategory;
        res.status(200).json(thing);
      }
    })
    .catch(error => res.status(404).json({ error })); 
};
  exports.getThings =  (req, res, next) => {
    Thing.find().populate('category')
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };

