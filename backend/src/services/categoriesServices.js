import { pool } from '../config/db_categories.js';
export { getCategories_In_Db , addCategories_In_Db, editCategory_In_Db, removeCategory_In_Db};

const getCategories_In_Db = async (userId) => {
  try {
    const queryText = userId
      ? 'SELECT * FROM categories WHERE user_id = $1'
      : 'SELECT * FROM categories';
    const queryValues = userId ? [userId] : [];

    const queryResult = await pool.query(queryText, queryValues);

    if (queryResult.rows.length === 0) {
      const err = new Error("Aucune catégorie trouvée");
      err.code = "NOT_FOUND";
      throw err;
    }

    return queryResult.rows;
  } catch (err) {
    throw err;
  }
};

const addCategories_In_Db = async (name, userId) => {
  // Vérification des paramètres
  if (!name || !userId) {
    throw new Error("Le nom de la catégorie et l'userId sont obligatoires");
  }

  const query = `
    INSERT INTO categories (name, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [name, userId];

  try {
    const result = await pool.query(query, values);
    // Retourne uniquement la catégorie insérée
    return result.rows[0];
  } catch (err) {
  
    throw err;
  }
};

const editCategory_In_Db = async (newName, categoryID, userId) => {
  const query = `
    UPDATE categories
    SET name = $1, updated_at = now()
    WHERE id = $2 AND user_id = $3
    RETURNING *;
  `;
  
  const values = [newName, categoryID, userId];

  try {
    const result = await pool.query(query, values);

    // Vérification si aucune ligne n'a été mise à jour
    if (!result.rows || result.rows.length === 0) {
      const error = new Error(`Aucune catégorie trouvée avec id=${categoryID} pour l'utilisateur ${userId}`);
      error.code = "NOT_FOUND";
      throw error;
    }

    return result.rows[0];
  } catch (err) {

    throw err; 
  }
};

const removeCategory_In_Db = async (categoryID, userId) => {
   if (!categoryID || !userId) {
    throw new Error("categoryID et userId sont obligatoires pour supprimer une catégorie");
  }

  const query = `
    DELETE FROM categories
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;
  const values = [categoryID, userId];

  try {
    const result = await pool.query(query, values);

    // Vérifie si une ligne a été supprimée
    if (!result.rows || result.rows.length === 0) {
      throw new Error(`Aucune catégorie trouvée avec id=${categoryID} pour cet utilisateur`);
    }

    return result.rows[0];
  } catch (err) {
    throw err;
  }
};