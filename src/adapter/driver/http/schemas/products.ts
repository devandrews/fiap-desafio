import { ProductCategory } from "@/core/domain/product";
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: z.nativeEnum(ProductCategory),
  price: z.number().positive(),
  description: z.string(),
  images: z.string().array(),
});

// GET
export const getProductsResponseSchema = z.object({
  data: z.array(productSchema),
  total: z.number().int(),
});
export const getProductCategoryRequestParamsSchema = productSchema.pick({
  category: true,
});

// POST
export const createProductRequestBodySchema = productSchema.omit({
  id: true,
});
export const createProductResponseSchema = z.object({ data: productSchema });

// PATCH
export const updateProductRequestBodySchema = productSchema
  .omit({
    id: true,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export const updateProductResponseSchema = z.object({ data: productSchema });

// DELETE
export const deleteProductRequestParamsSchema = z.object({
  id: z.string().uuid(),
});
