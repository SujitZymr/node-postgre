require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const usersRouter = require("./router/users.router");
const pool = require("./config/database");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(express.json());

app.get("/api-docs.json", (req, res) => {
    res.type("application/json").send(swaggerSpec);
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: "Users API Documentation",
        swaggerOptions: {
            displayRequestDuration: true,
            tryItOutEnabled: true,
        },
    })
);

app.use("/users", usersRouter);

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check API and database health
 *     description: Verifies that the API is running and PostgreSQL accepts a query.
 *     operationId: checkHealth
 *     responses:
 *       '200':
 *         description: API and database are available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *                 - databaseTime
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API and database are working
 *                 databaseTime:
 *                   type: string
 *                   format: date-time
 *                   example: '2026-09-07T10:30:00.000Z'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
app.get("/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW() AS current_time");

        res.json({
            message: "API and database are working",
            databaseTime: result.rows[0].current_time,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database connection failed" });
    }
});

if (require.main === module) {
    const port = process.env.PORT || 3000;

    app.listen(port, (error) => {
        if (error) {
            console.error("Unable to start server:", error);
            process.exitCode = 1;
            return;
        }

        console.log(`Server running on http://localhost:${port}`);
    });
}

module.exports = app;
