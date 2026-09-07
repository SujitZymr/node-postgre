const pool = require("../config/database");

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users ORDER BY id ASC"
        );

        res.status(200).json({ message: "Users retrieved successfully", users: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to retrieve users" });
    }
}


const getUsers = async (req, res) => {
    try {
        const search = req.query.search?.trim();

        let query = `
            SELECT *
            FROM users
        `;

        const values = [];

        if (search) {
            values.push(`%${search}%`);

            query += `
                WHERE name ILIKE $1
                OR email ILIKE $1
            `;
        }

        query += ` ORDER BY id ASC`;

        const result = await pool.query(query, values);

        return res.status(200).json({
            message: "Users retrieved successfully",
            users: result.rows,
        });
    } catch (error) {
        console.error("Failed to retrieve users:", error);

        return res.status(500).json({
            message: "Failed to retrieve users",
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const result = await pool.query(
            `INSERT INTO users (name, email)
       VALUES ($1, $2)
       RETURNING *`,
            [name, email]
        );

        res.status(201).json({ message: "User created successfully", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to create user" });
    }
}


const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const result = await pool.query(
            `UPDATE users
       SET name = $1, email = $2
       WHERE id = $3
       RETURNING *`,
            [name, email, req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to update user" });
    }
}

const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;
        const result = await pool.query(
            "DELETE FROM USERS WHERE id= $1 RETURNING *",
            [id]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user: result.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to delete user" });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUsers
}