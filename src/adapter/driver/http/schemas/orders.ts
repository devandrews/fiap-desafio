import { z } from "zod";

import { OrderStatus } from "@/core/domain/order";

const orderItemSchema = z.object({
  id: z.string().uuid(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

const orderSchema = z.object({
  id: z.string().uuid(),
  products: z.array(orderItemSchema),
  total: z.number().positive(),
  status: z.nativeEnum(OrderStatus),
});

// GET
export const getOrdersResponseSchema = z.object({
  data: z.array(orderSchema),
  total: z.number().int(),
});

// POST
export const createOrderRequestBodySchema = orderSchema.omit({
  id: true,
});
export const createOrderResponseSchema = z.object({ data: orderSchema });

// PATCH
export const updateOrderStatusRequestBodySchema = orderSchema.pick({
  status: true,
});
export const updateOrderStatusResponseSchema = z.object({ data: orderSchema });
