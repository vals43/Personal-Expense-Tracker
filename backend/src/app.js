import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import categoriesRouter from './routes/categories.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/categories',categoriesRouter);

export default app;
