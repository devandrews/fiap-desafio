import { ProductCategory } from "@/core/domain/product";
import { z } from "zod";

export const getProductCategoryRequestParamsSchema = z.object({
  category: z.nativeEnum(ProductCategory),
});

export const createProductRequestBodySchema = z.object({
  name: z.string(),
  category: z.nativeEnum(ProductCategory),
  price: z.number().positive(),
  description: z.string(),
  images: z.string().array(),
});

export const updateProductRequestBodySchema = z
  .object({
    name: z.string().optional(),
    category: z.nativeEnum(ProductCategory).optional(),
    price: z.number().positive().optional(),
    description: z.string().optional(),
    images: z.string().array().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
