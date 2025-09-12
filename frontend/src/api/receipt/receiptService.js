import apiClient from "../auth/apiClient";

// 🔹 GET /receipts/{id}
export const fetchReceiptByExpenseId = async (expenseId) => {
  try {
    const response = await apiClient.get(`api/receipts/${expenseId}`, {
      responseType: "arraybuffer", // On récupère le fichier en binaire
    });

    const contentType = response.headers["content-type"] || "application/octet-stream";
    return new Blob([response.data], { type: contentType });
  } catch (error) {
    console.error("❌ Error fetching receipt:", error.message, error.response?.data);
    throw new Error("Impossible de récupérer le reçu. Vérifie la connexion ou le backend.");
  }
};

// 🔹 Ouvrir le reçu (dans un onglet ou dans le state React)
export const openReceipt = async (expenseId, setSelectedReceipt, { autoOpen = true } = {}) => {
  try {
    const blob = await fetchReceiptByExpenseId(expenseId);
    const url = URL.createObjectURL(blob);

    // Mettre à jour le state si fourni
    if (typeof setSelectedReceipt === "function") {
      setSelectedReceipt({ url, type: blob.type });
    }

    // Ouvrir automatiquement si demandé
    if (autoOpen) {
      const newTab = window.open(url, "_blank");
      if (newTab) {
        newTab.onload = () => URL.revokeObjectURL(url); // Nettoyage quand onglet chargé
      }
    }

    return url;
  } catch (err) {
    console.error("❌ Failed to open receipt:", err.message, err.response?.data);
    throw err;
  }
};
