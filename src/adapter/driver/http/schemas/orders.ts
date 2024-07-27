import { z } from '@/external/validators/zod'

import { OrderStatus } from '@/core/domain/order'

const orderItemSchema = z.object({
  id: z.string().uuid().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
  price: z.number().positive().openapi({
    example: 10.99
  }),
  quantity: z.number().positive().int().openapi({
    example: 1
  })
})

const orderSchema = z.object({
  id: z.string().uuid().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
  products: z.array(orderItemSchema),
  total: z.number().positive().openapi({
    example: 10.99
  }),
  status: z.nativeEnum(OrderStatus)
})

// GET
export const getOrdersResponseSchema = z.object({
  data: z.array(orderSchema),
  total: z.number().int().openapi({
    example: 1
  })
})

// POST
export const createOrderRequestBodySchema = orderSchema.omit({
  id: true
})
export const createOrderResponseSchema = z.object({ data: orderSchema })

// PATCH
export const updateOrderStatusRequestBodySchema = orderSchema.pick({
  status: true
})
export const updateOrderStatusResponseSchema = z.object({ data: orderSchema })
