import { z } from '@/external/zod'

import { OrderStatus } from '@/entities/order'

const orderItemSchema = z.object({
  id: z.coerce.number().openapi({
    example: 1
  }),
  price: z.number().positive().openapi({
    example: 10.99
  }),
  quantity: z.number().positive().int().openapi({
    example: 1
  })
})

const orderSchema = z.object({
  id: z.coerce.number().openapi({
    example: 1
  }),
  user_id: z.coerce.number().nullable().openapi({
    example: 1
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
