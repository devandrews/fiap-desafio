import { z } from "zod";

import { OrderStatus } from "@/core/domain/order";

export const createOrderRequestBodySchema = z.object({
  total: z.number().positive(),
  status: z.nativeEnum(OrderStatus),
  products: z
    .object({
      id: z.string(),
      price: z.number().positive(),
      quantity: z.number().positive(),
    })
    .array(),
});

export const updateOrderStatusRequestBodySchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
