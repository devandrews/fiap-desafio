import { ZodError } from "zod";
import { Express } from "express";

import { OrderService } from "@/core/application/services/order-service";
import {
  createOrderRequestBodySchema,
  createOrderResponseSchema,
  getOrdersResponseSchema,
  updateOrderStatusRequestBodySchema,
} from "../schemas/orders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export class HttpOrdersRoutes {
  constructor(
    private readonly app: Express,
    private readonly service: OrderService,
    private readonly openAPIRegistry: OpenAPIRegistry
  ) {
    this.openApi();
  }

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

  openApi(): void {
    // GET /orders
    this.openAPIRegistry.registerPath({
      tags: ["Orders"],
      method: "get",
      path: "/orders",
      responses: {
        200: {
          description: "Orders list",
          content: {
            "application/json": {
              schema: getOrdersResponseSchema,
            },
          },
        },
      },
    });

    // POST /orders
    this.openAPIRegistry.registerPath({
      tags: ["Orders"],
      method: "post",
      path: "/orders",
      request: {
        body: {
          content: {
            "application/json": {
              schema: createOrderRequestBodySchema,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Order created",
          content: {
            "application/json": {
              schema: createOrderResponseSchema,
            },
          },
        },
        400: {
          description: "Invalid request body",
        },
        500: {
          description: "Internal server error",
        },
      },
    });

    // PATCH /order/:id/status
    this.openAPIRegistry.registerPath({
      tags: ["Orders"],
      method: "patch",
      path: "/order/:id/status",
      request: {
        body: {
          content: {
            "application/json": {
              schema: updateOrderStatusRequestBodySchema,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Order status updated",
          content: {
            "application/json": {
              schema: createOrderResponseSchema,
            },
          },
        },
        400: {
          description: "Invalid request body",
        },
        500: {
          description: "Internal server error",
        },
      },
    });
  }
}
