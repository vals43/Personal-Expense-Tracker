const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/incomes');
const categoryRoutes = require('./routes/categories');
const summaryRoutes = require('./routes/summary');
const receiptRoutes = require('./routes/receipts');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration to allow the frontend origin
const corsOptions = {
  origin: 'http://localhost:5173', // Match your frontend URL (Vite development server)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies or authentication if needed
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

const openApiSpec = yaml.load(fs.readFileSync(path.join(__dirname, 'docs/Expense Tracker API.yaml'), 'utf8'));

// Configurer Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/user', userRoutes);

// Fonction pour démarrer le serveur
async function startServer() {
  try {
    // 🔹 Synchronisation des modèles avec la DB
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

    // 🔹 Démarrage du serveur après la sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger UI disponible sur http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Unable to connect or sync database:', err);
  }
}

startServer();

module.exports = app;