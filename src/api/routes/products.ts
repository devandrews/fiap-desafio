import { ZodError } from 'zod'
import { Express } from 'express'

import { ProductCategory } from '@/entities/product'
import { ProductUsecase } from '@/usecases/product'
import {
  createProductRequestBodySchema,
  createProductResponseSchema,
  deleteProductRequestParamsSchema,
  getProductCategoryRequestParamsSchema,
  getProductsResponseSchema,
  updateProductRequestBodySchema,
  updateProductResponseSchema
} from '../schemas/products'

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

export class HttpProductsRoutes {
  constructor (
    private readonly app: Express,
    private readonly usecase: ProductUsecase,
    private readonly openAPIRegistry: OpenAPIRegistry
  ) {
    this.openApi()
  }

  setup (): void {
    this.app.get('/products', async (_, res) => {
      const products = await this.usecase.get()
      res.status(200).json({ data: products, total: products.length })
    })

    this.app.get('/products/:category', async (req, res) => {
      try {
        getProductCategoryRequestParamsSchema.parse(req.params)
        const { category } = req.params
        const products = await this.usecase.getByCategory(
          category as ProductCategory
        )
        res.status(200).json({ data: products, total: products.length })
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors })
        }
        res.status(500).json({ error: error.message })
      }
    })

    this.app.post('/products', async (req, res) => {
      try {
        const body = createProductRequestBodySchema.parse(req.body)
        const product = await this.usecase.create(body)
        res.status(201).json({ data: product })
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors })
        }
        res.status(500).json({ error: error.message })
      }
    })

    this.app.patch('/products/:id', async (req, res) => {
      try {
        const body = updateProductRequestBodySchema.parse(req.body)
        const { id } = req.params
        const product = await this.usecase.update(id, body)
        res.status(200).json({ data: product })
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors })
        }
        res.status(500).json({ error: error.message })
      }
    })

    this.app.delete('/products/:id', async (req, res) => {
      const { id } = req.params
      await this.usecase.remove(id)
      res.status(204).send()
    })
  }

  openApi (): void {
    // GET /products
    this.openAPIRegistry.registerPath({
      tags: ['Products'],
      method: 'get',
      path: '/products',
      responses: {
        200: {
          description: 'Products list',
          content: {
            'application/json': {
              schema: getProductsResponseSchema
            }
          }
        }
      }
    })

    // GET /products/:category
    this.openAPIRegistry.registerPath({
      tags: ['Products'],
      method: 'get',
      path: '/products/{category}',
      request: {
        params: getProductCategoryRequestParamsSchema
      },
      responses: {
        200: {
          description: 'Products list by category',
          content: {
            'application/json': {
              schema: getProductsResponseSchema
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

    // POST /products
    this.openAPIRegistry.registerPath({
      tags: ['Products'],
      method: 'post',
      path: '/products',
      request: {
        body: {
          content: {
            'application/json': {
              schema: createProductRequestBodySchema
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Product created',
          content: {
            'application/json': {
              schema: createProductResponseSchema
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

    // PATCH /products/:id
    this.openAPIRegistry.registerPath({
      tags: ['Products'],
      method: 'patch',
      path: '/products/{id}',
      request: {
        body: {
          content: {
            'application/json': {
              schema: updateProductRequestBodySchema
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Product updated',
          content: {
            'application/json': {
              schema: updateProductResponseSchema
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

    // DELETE /products/:id
    this.openAPIRegistry.registerPath({
      tags: ['Products'],
      method: 'delete',
      path: '/products/{id}',
      request: {
        params: deleteProductRequestParamsSchema
      },
      responses: {
        204: {
          description: 'Product deleted'
        },
        500: {
          description: 'Internal server error'
        }
      }
    })
  }
}
