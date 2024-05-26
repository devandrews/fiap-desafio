import { Express, NextFunction, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { readOpenApiDocumentation } from "@/index";
import { Request } from "express";

export class HttpDocsRoutes {
  constructor(private readonly app: Express) {}

  swaggerFileMiddleware(req: Request, _: Response, next: NextFunction) {
    const openApiSpecs = readOpenApiDocumentation();
    req.swaggerDoc = JSON.parse(openApiSpecs);
    next();
  }

  swaggerUiHandler() {
    return swaggerUi.setup();
  }

  setup(): void {
    this.app.get("/docs", this.swaggerFileMiddleware, this.swaggerUiHandler());
  }
}
