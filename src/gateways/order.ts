import { Order, OrderStatus } from '@/entities/order'

export interface OrderGatewayInterface {
  get: () => Promise<Order[]>
  create: (order: Omit<Order, 'id'>) => Promise<Order>
  updateStatus: (id: string, order: OrderStatus) => Promise<Order>
}
