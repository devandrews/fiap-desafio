import { OrderRepository } from "@/core/application/contracts/order-repository";
import { Express } from "express";

export class HttpOrdersRoutes {
  constructor(
    private readonly app: Express,
    private readonly repository: OrderRepository
  ) {}

  setup(): void {
    this.app.get("/orders", async (__, res) => {
      const orders = await this.repository.get();
      res.status(200).json({ data: orders, total: orders.length });
    });

    this.app.post("/orders", async (req, res) => {
      const createdOrder = await this.repository.create(req.body);
      res.status(201).json(createdOrder);
    });

    this.app.put("/orders/:id", async (req, res) => {
      const { id } = req.params;
      const order = req.body;
      if (!order.status) {
        res.status(400).json({ error: "Status is required" });
        return;
      }
      const updatedOrder = await this.repository.updateStatus(id, order.status);
      res.json(updatedOrder);
    });
  }
}
