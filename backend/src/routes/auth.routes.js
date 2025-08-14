import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profil sécurisé', user: req.user });
});

export default router;
