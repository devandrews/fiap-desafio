import { OrderGatewayInterface } from '@/gateways/order'
import { Order, OrderStatus } from '@/entities/order'
import { DbConnection } from '@/interfaces/db-connection'

export class PgOrderGatewayInterface implements OrderGatewayInterface {
  constructor (private readonly db: DbConnection) {}

  async get (): Promise<Order[]> {
    const orders = await this.db.query('select * from orders')

    for (const order of orders) {
      const products = await this.db.query(
        'select * from order_items where order_id = $1',
        [order.id]
      )

      order.products = products
    }

    return orders
  }

  async create (_order: Omit<Order, 'id'>): Promise<Order> {
    const { products, ...order } = _order

    const [createdOrder] = await this.db.query(
      `
      insert into orders (status, total)
      values ($1, $2)
      returning *
      `,
      [order.status, order.total]
    )

    if (products.length) {
      const items = []
      for (const product of products) {
        const item = await this.db.query(
          `
          insert into order_items (order_id, product_id, quantity, price)
          values ($1, $2, $3, $4)
          return *
          `,
          [createdOrder.id, product.id, product.quantity, product.price]
        )
        items.push(item)
      }
      createdOrder.products = items
    }

    return createdOrder
  }

  async updateStatus (id: string, status: OrderStatus): Promise<Order> {
    const [updatedOrder] = await this.db.query(
      'update orders set status = $1 where id = $2',
      [status, id]
    )

    return updatedOrder
  }
}
