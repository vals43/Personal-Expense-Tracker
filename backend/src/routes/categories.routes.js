import { getAllCategories, addCategory, editCategory, removeCategory } from '../controllers/categories.controller.js';
import express from 'express';

const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/", addCategory);
categoriesRouter.put("/:id", editCategory);
categoriesRouter.delete("/:id", removeCategory);

export default categoriesRouter;