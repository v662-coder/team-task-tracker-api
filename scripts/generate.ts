import { execSync } from "child_process";
import { exportSwaggerJSON } from "../src/docs/swagger";
import fs from "fs";

// 1. Ensure folder exists
if (!fs.existsSync("generated")) {
  fs.mkdirSync("generated");
}

// 2. Generate swagger JSON
exportSwaggerJSON();

// 3. Generate TypeScript types from OpenAPI
execSync(
  "npx openapi-typescript generated/swagger.json -o generated/types/api-types.ts",
  { stdio: "inherit" }
);

// 4. Generate API client
execSync(
  "npx openapi-typescript-codegen --input generated/swagger.json --output generated/api-client --client axios",
  { stdio: "inherit" }
);

console.log("🚀 All code generation completed!");