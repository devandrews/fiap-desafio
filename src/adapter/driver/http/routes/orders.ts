import { ZodError } from "zod";
import { Express } from "express";

import { OrderService } from "@/core/application/services/order-service";
import {
  createOrderRequestBodySchema,
  updateOrderStatusRequestBodySchema,
} from "../validators/orders";

export class HttpOrdersRoutes {
  constructor(
    private readonly app: Express,
    private readonly service: OrderService
  ) {}

  setup(): void {
    this.app.get("/orders", async (__, res) => {
      const orders = await this.service.get();
      res.status(200).json({ data: orders, total: orders.length });
    });

    this.app.post("/orders", async (req, res) => {
      try {
        const body = createOrderRequestBodySchema.parse(req.body);
        const createdOrder = await this.service.create(body);
        res.status(201).json({ data: createdOrder });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
      }
    });

    this.app.patch("/order/:id/status", async (req, res) => {
      try {
        const body = updateOrderStatusRequestBodySchema.parse(req.body);
        const { id } = req.params;
        const updatedOrder = await this.service.updateStatus(id, body.status);
        res.json({ data: updatedOrder });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
      }
    });
  }
}
