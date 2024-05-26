import "dotenv/config";

import { z } from "zod";
import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import path from "path";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { HttpDriver } from "@/adapter/driver/http";

extendZodWithOpenApi(z);

export const OPEN_API_FILE_PATH = path.join(process.cwd(), "openapi.json");

function getOpenApiDocumentation(openAPIRegistry: OpenAPIRegistry) {
  const generator = new OpenApiGeneratorV31(openAPIRegistry.definitions);

  return generator.generateDocument({
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
      title: "Sistema de controle de pedidos",
    },
  });
}

async function writeOpenApiDocumentation(openAPIRegistry: OpenAPIRegistry) {
  console.log("Writing OpenAPI documentation to file.");
  const docs = getOpenApiDocumentation(openAPIRegistry);

  const fileContent = JSON.stringify(docs, null, 2);

  await writeFile(OPEN_API_FILE_PATH, fileContent, {
    encoding: "utf-8",
  });
}

export function readOpenApiDocumentation() {
  console.log("Reading OpenAPI documentation file.");

  return readFileSync(OPEN_API_FILE_PATH, { encoding: "utf-8" });
}

function main() {
  const openAPIRegistry = new OpenAPIRegistry();
  const httpDriver = new HttpDriver(openAPIRegistry);

  httpDriver.start();

  writeOpenApiDocumentation(openAPIRegistry).catch((error) => {
    console.error("Error writing OpenAPI documentation to file:", error);
  });
}

main();
