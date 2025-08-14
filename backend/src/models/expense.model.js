import { pool } from "../config/db.js";

export const getExpensesFiltered = async (filters) => {
    const conditions = [];
    const values = [];
    let idx = 1;

    if (filters.category_id) {
        values.push(filters.category_id);
        conditions.push(`category_id = $${idx++}`);
    }

    if (filters.type) {
        values.push(filters.type);
        conditions.push(`type = $${idx++}`);
    }

    if (filters.month) {
        const year = new Date().getFullYear();
        const monthPadded = String(filters.month).padStart(2, '0');
        const startMonth = `${year}-${monthPadded}-01`;
        const endMonth = `${year}-${monthPadded}-31`;

        values.push(startMonth, endMonth, endMonth);
        conditions.push(`(
            (type = 'One-time' AND date BETWEEN $${idx} AND $${idx+1})
            OR (type = 'Recurring' AND start_date <= $${idx+2} AND (end_date IS NULL OR end_date >= $${idx}))
        )`);
        idx += 3;
    }

    if (filters.day) {
        const [yy, mm, dd] = filters.day.split('-');
        const year = `20${yy}`;
        const startDay = `${year}-${mm}-${dd}T00:00:00.000Z`;
        const endDay = `${year}-${mm}-${dd}T23:59:59.999Z`;

        values.push(startDay, endDay, endDay);
        conditions.push(`(
            (type = 'One-time' AND date BETWEEN $${idx} AND $${idx+1})
            OR (type = 'Recurring' AND start_date <= $${idx+2} AND (end_date IS NULL OR end_date >= $${idx}))
        )`);
        idx += 3;
    }

    let query = "SELECT * FROM expenses";
    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }
    query += " ORDER BY date DESC";

    const { rows } = await pool.query(query, values);
    return rows;
};


export const getExpenseById = async (id) => {
    const result = await pool.query("SELECT * FROM expenses WHERE id = $1", [id]);
    return result.rows[0];
};

export const createExpense = async ({
    user_id,
    category_id,
    amount,
    date,
    description = null,
    type = 'One-time',
    receipt_id = null,
    start_date = null,
    end_date = null
}) => {
    const query = `
        INSERT INTO expenses (
            user_id, category_id, amount, description, type,
            receipt_id, date, creation_date, start_date, end_date
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),$8,$9)
        RETURNING *;
    `;
    const values = [
        user_id,
        category_id,
        amount,
        description,
        type,
        receipt_id,
        date,
        start_date,
        end_date
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const updateExpense = async ({
    id,
    category_id,
    amount,
    date,
    description,
    type,
    receipt_id,
    start_date,
    end_date
}) => {
    const fields = [];
    const values = [];
    let index = 1;

    if (category_id !== undefined) { fields.push(`category_id=$${index++}`); values.push(category_id); }
    if (amount !== undefined) { fields.push(`amount=$${index++}`); values.push(amount); }
    if (date !== undefined) { fields.push(`date=$${index++}`); values.push(date); }
    if (description !== undefined) { fields.push(`description=$${index++}`); values.push(description); }
    if (type !== undefined) { fields.push(`type=$${index++}`); values.push(type); }
    if (receipt_id !== undefined) { fields.push(`receipt_id=$${index++}`); values.push(receipt_id); }
    if (start_date !== undefined) { fields.push(`start_date=$${index++}`); values.push(start_date); }
    if (end_date !== undefined) { fields.push(`end_date=$${index++}`); values.push(end_date); }

    if (fields.length === 0) throw new Error("No fields to update");

    const query = `
        UPDATE expenses SET ${fields.join(", ")}
        WHERE id=$${index}
        RETURNING *;
    `;
    values.push(id);

    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const deleteExpense = async (id) => {
    await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
};
