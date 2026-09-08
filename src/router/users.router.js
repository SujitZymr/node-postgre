const express = require("express");

const {
    createUser,
    updateUser,
    deleteUser,
    getUsers
} = require("../controller/users.controller");

const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: List users
 *     description: Returns all users ordered by ID. Supply `search` to filter by name or email (case-insensitive).
 *     operationId: listUsers
 *     parameters:
 *       - name: search
 *         in: query
 *         required: false
 *         description: Partial name or email to search for
 *         schema:
 *           type: string
 *         example: asha
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a user
 *     operationId: createUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.route("/").get(getUsers).post(createUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Replace a user's name and email
 *     operationId: updateUser
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               message: User updated successfully
 *               user:
 *                 id: 1
 *                 name: Asha Sharma
 *                 email: asha@example.com
 *       '404':
 *         $ref: '#/components/responses/UserNotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     operationId: deleteUser
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               message: User deleted successfully
 *               user:
 *                 id: 1
 *                 name: Asha Sharma
 *                 email: asha@example.com
 *       '404':
 *         $ref: '#/components/responses/UserNotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
