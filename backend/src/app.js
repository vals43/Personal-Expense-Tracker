const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for receipts
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/user', userRoutes);

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;

