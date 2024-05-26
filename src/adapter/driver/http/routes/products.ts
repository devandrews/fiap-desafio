import { ZodError } from "zod";
import { Express } from "express";

import { ProductCategory } from "@/core/domain/product";
import { ProductService } from "@/core/application/services/product.service";
import {
  createProductRequestBodySchema,
  getProductCategoryRequestParamsSchema,
  updateProductRequestBodySchema,
} from "../schemas/products";

export class HttpProductsRoutes {
  constructor(
    private readonly app: Express,
    private readonly service: ProductService
  ) {}

  setup(): void {
    this.app.get("/products", async (_, res) => {
      const products = await this.service.get();
      res.status(200).json({ data: products, total: products.length });
    });

    this.app.get("/products/:category", async (req, res) => {
      try {
        getProductCategoryRequestParamsSchema.parse(req.params);
        const { category } = req.params;
        const products = await this.service.getByCategory(
          category as ProductCategory
        );
        res.status(200).json({ data: products, total: products.length });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post("/products", async (req, res) => {
      try {
        const body = createProductRequestBodySchema.parse(req.body);
        const product = await this.service.create(body);
        res.status(201).json({ data: product });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
      }
    });

    this.app.patch("/products/:id", async (req, res) => {
      try {
        const body = updateProductRequestBodySchema.parse(req.body);
        const { id } = req.params;
        const product = await this.service.update(id, body);
        res.status(200).json({ data: product });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
      }
    });

    this.app.delete("/products/:id", async (req, res) => {
      const { id } = req.params;
      await this.service.remove(id);
      res.status(204).send();
    });
  }
}
