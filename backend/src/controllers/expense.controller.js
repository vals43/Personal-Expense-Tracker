import { pool } from "../config/db.js";

export const getAllExpenses = async () => {
    const result = await pool.query("SELECT * FROM expense ORDER BY date DESC")
    return result.rows
}

export const getExpensesById = async (id) => {
    const result = await pool.query(`SELECT * FROM expense WHERE id = ${id}`)
    return result.rows
}

export const createExpenses = async ({ 
    user_id, 
    category_id, 
    amount, 
    description, 
    date, 
    is_recurring = false, 
    recurring_type = null, 
    start_date = null, 
    end_date = null 
}) => {
    const query = `
        INSERT INTO expenses (
            user_id, category_id, amount, description, date, 
            is_recurring, recurring_type, start_date, end_date
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *;
    `;

    const values = [
        user_id, 
        category_id, 
        amount, 
        description, 
        date, 
        is_recurring, 
        recurring_type, 
        start_date, 
        end_date
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
};
export const updateExpense = async ({
    id,
    user_id = null,
    category_id = null,
    amount = null,
    description = null,
    date = null,
    is_recurring = false,
    recurring_type = null,
    start_date = null,
    end_date = null,
    title = null 
  }) => {
    const query = `
      UPDATE expenses SET
        user_id=$1,
        category_id=$2,
        amount=$3,
        description=$4,
        date=$5,
        is_recurring=$6,
        recurring_type=$7,
        start_date=$8,
        end_date=$9,
        title=$10
      WHERE id=$11
      RETURNING *;
    `;
  
    const values = [
      user_id,
      category_id,
      amount,
      description,
      date,
      is_recurring,
      recurring_type,
      start_date,
      end_date,
      title,
      id
    ];
  
    const result = await pool.query(query, values);
    return result.rows[0];
  };

export const deleteExpense = async (id) => {
    await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
  };