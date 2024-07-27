import { Product, ProductCategory } from '@/entities/product'
import { ProductGatewayInterface } from '@/gateways/product'

export class ProductUsecase {
  constructor (private readonly repository: ProductGatewayInterface) {}

  async get (): Promise<Product[]> {
    return await this.repository.get()
  }

  async create (product: Omit<Product, 'id'>): Promise<Product> {
    return await this.repository.create(product)
  }

  async update (id: string, product: Partial<Product>): Promise<Product> {
    return await this.repository.update(id, product)
  }

  async remove (id: string): Promise<void> {
    await this.repository.remove(id)
  }

  async getByCategory (category: ProductCategory): Promise<Product[]> {
    return await this.repository.getByCategory(category)
  }
}
