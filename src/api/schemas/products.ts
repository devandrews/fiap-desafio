import { z } from '@/external/zod'
import { ProductCategory } from '@/entities/product'

const productSchema = z.object({
  id: z.string().uuid().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
  name: z.string().openapi({
    example: 'Product Name'
  }),
  category: z.nativeEnum(ProductCategory),
  price: z.number().positive().openapi({
    example: 10.99
  }),
  description: z.string().openapi({
    example: 'Product description'
  }),
  images: z
    .string()
    .array()
    .openapi({
      example: ['https://example.com/image.jpg']
    })
})

// GET
export const getProductsResponseSchema = z.object({
  data: z.array(productSchema),
  total: z.number().int().openapi({
    example: 1
  })
})
export const getProductCategoryRequestParamsSchema = productSchema.pick({
  category: true
})

// POST
export const createProductRequestBodySchema = productSchema.omit({
  id: true
})
export const createProductResponseSchema = z.object({ data: productSchema })

// PATCH
export const updateProductRequestBodySchema = productSchema
  .omit({
    id: true
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided'
  })
export const updateProductResponseSchema = z.object({ data: productSchema })

// DELETE
export const deleteProductRequestParamsSchema = z.object({
  id: z.string().uuid()
})
