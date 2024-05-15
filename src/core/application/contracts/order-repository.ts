import { Order, OrderStatus } from "@/core/domain/order";

export interface OrderRepository {
  get(): Order[];

  updateStatus(id: Pick<Order, "id">, order: OrderStatus): Order;
}
