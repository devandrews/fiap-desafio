import { ProductRepository } from "@/core/application/contracts/product-repository";
import { ProductCategory } from "@/core/domain/product";
import { Express } from "express";

export class HttpProductsRoutes {
  constructor(
    private readonly app: Express,
    private readonly repository: ProductRepository
  ) {}

  setup(): void {
    this.app.get("/products", async (_, res) => {
      const products = await this.repository.get();
      res.status(200).json({ data: products, total: products.length });
    });

    this.app.get("/products/:category", async (req, res) => {
      const { category } = req.params;
      const products = await this.repository.getByCategory(
        category as ProductCategory
      );
      res.status(200).json({ data: products, total: products.length });
    });

    this.app.post("/products", async (req, res) => {
      const product = await this.repository.create(req.body);
      res.status(201).json({ data: product });
    });

    this.app.patch("/products/:id", async (req, res) => {
      const { id } = req.params;
      const product = await this.repository.update(id, req.body);
      res.status(200).json({ data: product });
    });

    this.app.delete("/products/:id", async (req, res) => {
      const { id } = req.params;
      await this.repository.remove(id);
      res.status(204).send();
    });
  }
}
