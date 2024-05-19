import { ProductRepository } from "@/core/application/contracts/product-repository";
import { Express } from "express";

export class HttpProductsRoutes {
  constructor(
    private readonly app: Express,
    private readonly repository: ProductRepository
  ) {}

  setup(): void {
    this.app.get("/products", async (req, res) => {
      const products = await this.repository.get();

      res.status(200).json({ data: products, total: products.length });
    });
  }
}
