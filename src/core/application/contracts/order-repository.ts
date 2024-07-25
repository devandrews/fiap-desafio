import { Order, OrderStatus } from '@/core/domain/order'

export interface OrderRepository {
  get: () => Promise<Order[]>

  create: (order: Omit<Order, 'id'>) => Promise<Order>

  updateStatus: (id: string, order: OrderStatus) => Promise<Order>
}
