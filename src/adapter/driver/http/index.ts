import express, { Express } from "express";

import db from "@/adapter/driven/infra/pg/db";
import { PgOrderRepository } from "@/adapter/driven/infra/pg/repositories/order-repository";
import { PgProductRepository } from "@/adapter/driven/infra/pg/repositories/product-repository";

import { HttpOrdersRoutes } from "./routes/orders";
import { HttpProductsRoutes } from "./routes/products";
import { HttpUsersRoutes } from "./routes/users";
import { PgUserRepository } from "@/adapter/driven/infra/pg/repositories/user-repository";

const { PORT = 3000 } = process.env;

export const setupHttpDriver = (): Express => {
  const app = express();

  app.use(express.json());

  const httpOrdersRoutes = new HttpOrdersRoutes(app, new PgOrderRepository(db));
  const httpProductsRoutes = new HttpProductsRoutes(
    app,
    new PgProductRepository(db)
  );
  const httpUsersRoutes = new HttpUsersRoutes(app, new PgUserRepository(db));

  httpOrdersRoutes.setup();
  httpProductsRoutes.setup();
  httpUsersRoutes.setup();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  return app;
};
