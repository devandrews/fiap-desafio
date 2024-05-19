import { Order, OrderStatus } from "@/core/domain/order";

export interface OrderRepository {
  get(): Promise<Order[]>;

  create(order: Order): Promise<Order>;

  updateStatus(id: string, order: OrderStatus): Promise<Order>;
}
