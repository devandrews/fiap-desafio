import {
  createProductRequestBodySchema,
  deleteProductRequestParamsSchema,
  getProductCategoryRequestParamsSchema,
  updateProductRequestBodySchema
} from '@/api/schemas/products'
import { Product, ProductCategory } from '@/entities/product'
import { ProductUsecase } from '@/usecases/product'

export class ProductsController {
  constructor (private readonly usecase: ProductUsecase) {}

  async get () {
    const products = await this.usecase.get()
    return products
  }

  async getByCategory (category: ProductCategory) {
    const parsedCategory = getProductCategoryRequestParamsSchema.parse({
      category
    })
    const product = await this.usecase.getByCategory(parsedCategory.category)
    return product
  }

  async create (product: Omit<Product, 'id'>): Promise<Product> {
    const parsedProducts = createProductRequestBodySchema.parse(product)
    const createdProduct = await this.usecase.create(parsedProducts)
    return createdProduct
  }

  async update (id: number, product: Omit<Product, 'id'>): Promise<Product> {
    const parsedProduct = updateProductRequestBodySchema.parse(product)
    const updatedProduct = await this.usecase.update(id, parsedProduct)
    return updatedProduct
  }

  async remove (id: number): Promise<void> {
    const { id: parsedId } = deleteProductRequestParamsSchema.parse({ id })
    await this.usecase.remove(parsedId)
  }
}
