import swaggerJSDoc from "swagger-jsdoc";
import { writeFileSync } from "fs";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Tracker API",
      version: "1.0.0",
      description: "Task management system APIs",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

// 👉 EXPORT JSON FILE FOR GENERATION
export const exportSwaggerJSON = () => {
  writeFileSync(
    "./generated/swagger.json",
    JSON.stringify(swaggerSpec, null, 2)
  );

  console.log("✅ Swagger JSON generated");
};