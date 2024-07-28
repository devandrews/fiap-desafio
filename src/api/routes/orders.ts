import { ZodError } from 'zod'
import { Express } from 'express'

import { OrdersController } from '@/controllers/orders'

import {
  createOrderRequestBodySchema,
  createOrderResponseSchema,
  getOrdersResponseSchema,
  updateOrderStatusRequestBodySchema
} from '../schemas/orders'

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { OrderStatus } from '@/entities/order'

export class HttpOrdersRoutes {
  constructor (
    private readonly app: Express,
    private readonly controller: OrdersController,
    private readonly openAPIRegistry: OpenAPIRegistry
  ) {
    this.openApi()
  }

  setup (): void {
    this.app.get('/orders', async (__, res) => {
      const orders = await this.controller.get()
      res.status(200).json({ data: orders, total: orders.length })
    })

    this.app.post('/orders', async ({ body }, res) => {
      try {
        const createdOrder = await this.controller.create(body)
        res.status(201).json({ data: createdOrder })
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors })
        }
        res.status(500).json({ error: error.message })
      }
    })

    this.app.patch('/order/:id/status', async ({ params, body }, res) => {
      try {
        const updatedOrder = await this.controller.updateStatus(
          +params.id,
          body.status as OrderStatus
        )
        res.json({ data: updatedOrder })
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors })
        }
        res.status(500).json({ error: error.message })
      }
    })
  }

  openApi (): void {
    // GET /orders
    this.openAPIRegistry.registerPath({
      tags: ['Orders'],
      method: 'get',
      path: '/orders',
      responses: {
        200: {
          description: 'Orders list',
          content: {
            'application/json': {
              schema: getOrdersResponseSchema
            }
          }
        }
      }
    })

    // POST /orders
    this.openAPIRegistry.registerPath({
      tags: ['Orders'],
      method: 'post',
      path: '/orders',
      request: {
        body: {
          content: {
            'application/json': {
              schema: createOrderRequestBodySchema
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Order created',
          content: {
            'application/json': {
              schema: createOrderResponseSchema
            }
          }
        },
        400: {
          description: 'Invalid request body'
        },
        500: {
          description: 'Internal server error'
        }
      }
    })

    // PATCH /order/:id/status
    this.openAPIRegistry.registerPath({
      tags: ['Orders'],
      method: 'patch',
      path: '/order/:id/status',
      request: {
        body: {
          content: {
            'application/json': {
              schema: updateOrderStatusRequestBodySchema
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Order status updated',
          content: {
            'application/json': {
              schema: createOrderResponseSchema
            }
          }
        },
        400: {
          description: 'Invalid request body'
        },
        500: {
          description: 'Internal server error'
        }
      }
    })
  }
}
