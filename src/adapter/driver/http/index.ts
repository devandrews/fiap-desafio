import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

import db from "@/adapter/driven/infra/pg/db";
import { PgOrderRepository } from "@/adapter/driven/infra/pg/repositories/order-repository";
import { PgProductRepository } from "@/adapter/driven/infra/pg/repositories/product-repository";

import { HttpOrdersRoutes } from "./routes/orders";
import { HttpProductsRoutes } from "./routes/products";
import { HttpUsersRoutes } from "./routes/users";
import { PgUserRepository } from "@/adapter/driven/infra/pg/repositories/user-repository";
import { OrderService } from "@/core/application/services/order-service";
import { ProductService } from "@/core/application/services/product.service";
import { UserService } from "@/core/application/services/user-service";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { HttpDocsRoutes } from "./routes/docs";

const { APP_PORT = 3000 } = process.env;

export class HttpDriver {
  constructor(private readonly openAPIRegistry: OpenAPIRegistry) {}

  start(): void {
    const app = express();

    this.addMiddlewares(app);

    this.setupHttpUsersRoutes(app);
    this.setupHttpProductsRoutes(app);
    this.setupHttpOrdersRoutes(app);
    this.setupHttpDocsRoutes(app);

    app.listen(APP_PORT, () => {
      console.log(`Server is running on http://localhost:${APP_PORT}`);
    });
  }

  addMiddlewares(app: Express): void {
    app.use(express.json());
    app.use(express.text());
    app.use(express.urlencoded({ extended: false }));
    app.use(swaggerUi.serve);
  }

  setupHttpUsersRoutes(app: Express): void {
    const httpUsersService = new UserService(new PgUserRepository(db));
    const httpUsersRoutes = new HttpUsersRoutes(app, httpUsersService);
    httpUsersRoutes.setup();
  }

  setupHttpProductsRoutes(app: Express): void {
    const httpProductsService = new ProductService(new PgProductRepository(db));
    const httpProductsRoutes = new HttpProductsRoutes(
      app,
      httpProductsService,
      this.openAPIRegistry
    );
    httpProductsRoutes.setup();
  }

  setupHttpOrdersRoutes(app: Express): void {
    const httpOrdersService = new OrderService(new PgOrderRepository(db));
    const httpOrdersRoutes = new HttpOrdersRoutes(
      app,
      httpOrdersService,
      this.openAPIRegistry
    );
    httpOrdersRoutes.setup();
  }

  setupHttpDocsRoutes(app: Express): void {
    const httpDocsRoutes = new HttpDocsRoutes(app);
    httpDocsRoutes.setup();
  }
}
