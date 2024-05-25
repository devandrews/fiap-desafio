import express, { Express } from "express";

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

const { APP_PORT = 3000 } = process.env;

export const setupHttpDriver = (): Express => {
  const app = express();

  app.use(express.json());

  const httpOrdersService = new OrderService(new PgOrderRepository(db));
  const httpOrdersRoutes = new HttpOrdersRoutes(app, httpOrdersService);

  const httpProductsService = new ProductService(new PgProductRepository(db));
  const httpProductsRoutes = new HttpProductsRoutes(app, httpProductsService);

  const httpUsersService = new UserService(new PgUserRepository(db));
  const httpUsersRoutes = new HttpUsersRoutes(app, httpUsersService);

  httpOrdersRoutes.setup();
  httpProductsRoutes.setup();
  httpUsersRoutes.setup();

  app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
  });

  return app;
};
