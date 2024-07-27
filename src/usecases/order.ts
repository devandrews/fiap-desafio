import { Order, OrderStatus } from '@/entities/order'
import { OrderGatewayInterface } from '@/gateways/order'

export class OrderUsecase {
  constructor (private readonly repository: OrderGatewayInterface) {}

  async get (): Promise<Order[]> {
    return await this.repository.get()
  }

  async create (order: Omit<Order, 'id'>): Promise<Order> {
    return await this.repository.create(order)
  }

  async updateStatus (id: string, order: OrderStatus): Promise<Order> {
    return await this.repository.updateStatus(id, order)
  }
}
