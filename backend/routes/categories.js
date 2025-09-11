
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
