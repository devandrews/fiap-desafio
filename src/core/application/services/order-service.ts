import { Order, OrderStatus } from "@/core/domain/order";
import { OrderRepository } from "@/core/application/contracts/order-repository";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  getAll(): Order[] {
    return this.orderRepository.getAll();
  }

  updateStatus(id: Pick<Order, "id">, status: OrderStatus): Order {
    return this.orderRepository.updateStatus(id, status);
  }
}
