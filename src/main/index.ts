import "dotenv/config";

import express from "express";

import db from "@/adapter/infra/pg/db";
import { PgProductRepository } from "@/adapter/infra/pg/repositories/product-repository";
import { ProductCategory } from "@/core/domain/product";

const { PORT = 3000 } = process.env;

async function main() {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // const repo = new PgProductRepository(db);

  // const created = await repo.create({
  //   name: "Product 1",
  //   category: ProductCategory.ACOMPANHAMENTO,
  //   price: 10.0,
  //   description: "Description 1",
  //   images: ["image1.jpg", "image2.jpg"],
  // });

  // const updated = await repo.update(created.id, { price: 15.0 });

  // const products = await repo.getByCategory(ProductCategory.ACOMPANHAMENTO);

  // await repo.remove(created.id);

  // const productsAfterRemove = await repo.getByCategory(
  //   ProductCategory.ACOMPANHAMENTO
  // );

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
