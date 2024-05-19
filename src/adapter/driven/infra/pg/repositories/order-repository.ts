import { Knex } from "knex";

import { OrderRepository } from "@/core/application/contracts/order-repository";
import { Order, OrderStatus } from "@/core/domain/order";

export class PgOrderRepository implements OrderRepository {
  constructor(private readonly db: Knex) {}
  async get(): Promise<Order[]> {
    const orders = await this.db("orders").select("*");

    for (const order of orders) {
      const products = await this.db("order_items")
        .where("order_id", order.id)
        .select("*");

      order.products = products;
    }

    return orders;
  }

  async create(
    _order: Omit<Order, "id" | "createdAt" | "updatedAt">
  ): Promise<Order> {
    const { products, ...order } = _order;

    const [createdOrder] = await this.db("orders").insert(order).returning("*");

    if (products.length) {
      const items = await this.db("order_items")
        .insert(
          products.map((product) => ({
            order_id: createdOrder.id,
            product_id: product.id,
            quantity: product.quantity,
            price: product.price,
          }))
        )
        .returning("*");

      createdOrder.products = items;
    }

    return createdOrder;
  }

  async updateStatus(id: string, order: OrderStatus): Promise<Order> {
    const [updatedOrder] = await this.db("orders")
      .where("id", id)
      .update({ status: order })
      .returning("*");

    return updatedOrder;
  }
}
