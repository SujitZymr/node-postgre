const swaggerSpec = require("../config/swagger");

const expectedOperations = [
    ["/health", "get"],
    ["/users", "get"],
    ["/users", "post"],
    ["/users/{id}", "put"],
    ["/users/{id}", "delete"],
];

const missingOperations = expectedOperations.filter(
    ([path, method]) => !swaggerSpec.paths?.[path]?.[method]
);

if (missingOperations.length > 0) {
    throw new Error(
        `Swagger document is missing: ${missingOperations
            .map(([path, method]) => `${method.toUpperCase()} ${path}`)
            .join(", ")}`
    );
}

console.log(
    `Swagger document is valid and contains ${expectedOperations.length} operations.`
);
