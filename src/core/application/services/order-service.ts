import { Order, OrderStatus } from "@/core/domain/order";
import { OrderRepository } from "@/core/application/contracts/order-repository";

export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  async get(): Promise<Order[]> {
    return this.repository.get();
  }

  async create(order: Omit<Order, "id">): Promise<Order> {
    return this.repository.create(order);
  }

  async updateStatus(id: string, order: OrderStatus): Promise<Order> {
    return this.repository.updateStatus(id, order);
  }
}
