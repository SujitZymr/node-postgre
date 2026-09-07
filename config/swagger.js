const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    failOnErrors: true,
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Node.js PostgreSQL Users API",
            version: "1.0.0",
            description:
                "REST API for checking service health and managing users stored in PostgreSQL.",
        },
        servers: [
            {
                url: "/",
                description: "Current server",
            },
        ],
        tags: [
            {
                name: "Health",
                description: "Service and database health",
            },
            {
                name: "Users",
                description: "User management",
            },
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    required: ["id", "name", "email"],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                            readOnly: true,
                        },
                        name: {
                            type: "string",
                            example: "Asha Sharma",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "asha@example.com",
                        },
                    },
                },
                UserInput: {
                    type: "object",
                    required: ["name", "email"],
                    additionalProperties: false,
                    properties: {
                        name: {
                            type: "string",
                            example: "Asha Sharma",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "asha@example.com",
                        },
                    },
                },
                UsersResponse: {
                    type: "object",
                    required: ["message", "users"],
                    properties: {
                        message: {
                            type: "string",
                            example: "Users retrieved successfully",
                        },
                        users: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },
                UserResponse: {
                    type: "object",
                    required: ["message", "user"],
                    properties: {
                        message: {
                            type: "string",
                            example: "User created successfully",
                        },
                        user: {
                            $ref: "#/components/schemas/User",
                        },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    required: ["message"],
                    properties: {
                        message: {
                            type: "string",
                            example: "Unable to process request",
                        },
                        error: {
                            type: "string",
                            description: "Additional error information, when available.",
                        },
                    },
                },
            },
            parameters: {
                UserId: {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Numeric user identifier",
                    schema: {
                        type: "integer",
                        minimum: 1,
                    },
                    example: 1,
                },
            },
            responses: {
                UserNotFound: {
                    description: "The requested user does not exist",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse",
                            },
                            example: {
                                message: "User not found",
                            },
                        },
                    },
                },
                InternalServerError: {
                    description: "The request failed because of a server or database error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse",
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ["./server.js", "./router/*.js"],
};

module.exports = swaggerJSDoc(options);
