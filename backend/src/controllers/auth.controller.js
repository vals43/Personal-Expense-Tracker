import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'supersecret';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    return res.status(401).json({ message: 'Utilisateur non trouvé' });
  }

  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Mot de passe incorrect' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token });
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2)',
    [email, hashedPassword]
  );

  res.json({ message: 'Utilisateur créé avec succès' });
};
