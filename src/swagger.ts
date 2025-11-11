import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application, Express } from "express";

export function setupSwagger(app: Application) {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "My API Docs",
                version: "1.0.0",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                }
            ]
        },

        // Scan your route files for swagger comments
        apis: ["./src/routes/*.ts"],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}