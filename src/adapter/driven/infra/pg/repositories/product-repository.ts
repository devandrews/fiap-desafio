import { Knex } from 'knex'

import { ProductRepository } from '@/core/application/contracts/product-repository'
import { Product, ProductCategory } from '@/core/domain/product'

export class PgProductRepository implements ProductRepository {
  constructor (private readonly db: Knex) {}

  async get (): Promise<Product[]> {
    return await this.db('products')
  }

  async create (product: Omit<Product, 'id'>): Promise<Product> {
    const [createdProduct] = await this.db('products')
      .insert(product)
      .returning('*')

    return createdProduct
  }

  async update (id: string, product: Partial<Product>): Promise<Product> {
    const [updatedProduct] = await this.db('products')
      .update(product)
      .where('id', id)
      .returning('*')

    return updatedProduct
  }

  async remove (id: string): Promise<void> {
    await this.db('products').where('id', id).del()
  }

  async getByCategory (category: ProductCategory): Promise<Product[]> {
    return await this.db('products').where('category', category)
  }
}
