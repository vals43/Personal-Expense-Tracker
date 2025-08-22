import { getCategories_In_Db, addCategories_In_Db, editCategory_In_Db, removeCategory_In_Db } from '../services/categoriesServices.js'

const getAllCategories = async (req, res) => {
  try {
    const userId = req.query.userId;
    const categories = await getCategories_In_Db(userId);

    res.status(200).json({
      success: true,
      message: "Catégories récupérées avec succès",
      data: categories,
      count: categories.length
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Impossible de récupérer les catégories",
      error: err.detail || err.message || "Erreur inconnue"
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;

    // Vérification des paramètres
    if (!name || !userId) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la catégorie et l'userId sont obligatoires",
      });
    }

    // Appel au service pour ajouter la catégorie
    const newCategory = await addCategories_In_Db(name, userId);

    // Réponse succès
    res.status(201).json({
      success: true,
      message: "Catégorie ajoutée avec succès",
      data: newCategory,
    });
  } catch (err) {
    // Gestion des erreurs venant du service
    res.status(500).json({
      success: false,
      message: "Impossible d'ajouter la catégorie",
    });
  }
};


const editCategory = async (req, res) => {
  try {
    const { newCategoryName, userId } = req.body;
    const { id } = req.params;

    // Validation des paramètres
    if (!newCategoryName || !userId) {
      return res.status(400).json({
        success: false,
        message: "newCategoryName et userId sont obligatoires",
      });
    }

    const updatedCategory = await editCategory_In_Db(newCategoryName, id, userId);

    // Succès
    res.status(200).json({
      success: true,
      message: "Le nom de la catégorie a été modifié avec succès",
      data: updatedCategory, // retourne uniquement la catégorie modifiée
    });
  } catch (err) {
    // Gestion des erreurs provenant du service
    const statusCode = err.code === "NOT_FOUND" ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      message: err.message || "Impossible de modifier le nom de la catégorie",
    });
  }
};


const removeCategory = async (req, res) => {
 try {
    const { id } = req.params;   // l'id de la catégorie à supprimer
    const { userId } = req.body; // l'utilisateur qui supprime

    // Vérification des paramètres
    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "categoryID et userId sont obligatoires",
      });
    }

    // Appel au service pour supprimer la catégorie
    const deletedCategory = await removeCategory_In_Db(id, userId);

    // Réponse succès
    res.status(200).json({
      success: true,
      message: "Catégorie supprimée avec succès",
      data: deletedCategory,
    });
  } catch (err) {
    // Gestion des erreurs venant du service
    res.status(500).json({
      success: false,
      message: "Impossible de supprimer la catégorie",
      error: err.message || "Erreur inconnue",
    });
  }
}

export {getAllCategories, addCategory, editCategory, removeCategory};