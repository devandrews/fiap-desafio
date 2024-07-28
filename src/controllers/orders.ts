import {
  createOrderRequestBodySchema,
  updateOrderStatusRequestBodySchema
} from '@/api/schemas/orders'
import { Order, OrderStatus } from '@/entities/order'
import { OrderUsecase } from '@/usecases/order'

export class OrdersController {
  constructor (private readonly usecase: OrderUsecase) {}

  async get () {
    const orders = await this.usecase.get()
    return orders
  }

  async create (order: Omit<Order, 'id'>): Promise<Order> {
    const parsedOrders = createOrderRequestBodySchema.parse(order)
    const createdOrder = await this.usecase.create(parsedOrders)
    return createdOrder
  }

  async updateStatus (id: number, status: OrderStatus): Promise<Order> {
    const { status: parsedStatus } = updateOrderStatusRequestBodySchema.parse({
      status
    })
    const updatedOrder = await this.usecase.updateStatus(id, parsedStatus)
    return updatedOrder
  }
}
