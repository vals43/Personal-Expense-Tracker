const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const fetchAllExpenses = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${BACKEND_URL}/api/expenses${queryParams ? `?${queryParams}` : ''}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur lors de la récupération des dépenses: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API - fetchAllExpenses:", error);
    throw error;
  }
};

export const fetchExpenseById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/expenses/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur lors de la récupération de la dépense ${id}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API - fetchExpenseById:", error);
    throw error;
  }
};

export const createNewExpense = async (expenseData) => {
  try {
    console.log("createNewExpense: Objet à stringifier:", expenseData);
    console.log("createNewExpense: Chaîne JSON à envoyer:", JSON.stringify(expenseData));

    const response = await fetch(`${BACKEND_URL}/api/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData), // Cette ligne est cruciale
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur lors de la création de la dépense: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API - createNewExpense:", error);
    throw error;
  }
};


export const updateExistingExpense = async (id, expenseData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur lors de la mise à jour de la dépense ${id}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API - updateExistingExpense:", error);
    throw error;
  }
};

export const deleteExistingExpense = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/expenses/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      let errorMessage = `Erreur lors de la suppression de la dépense ${id}: ${response.status}`;
      try {
        // on essaie de parser si y’a du contenu
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch (e) {
        // pas grave, la réponse était vide
      }
      throw new Error(errorMessage);
    }

    // Pas de JSON si 204
    return true;
  } catch (error) {
    console.error("Erreur API - deleteExistingExpense:", error);
    throw error;
  }
};
