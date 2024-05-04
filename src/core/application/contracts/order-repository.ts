import { Order, OrderStatus } from "@/core/domain/order";

export interface OrderRepository {
  getAll(): Order[];

  updateStatus(id: Pick<Order, "id">, order: OrderStatus): Order;
}
