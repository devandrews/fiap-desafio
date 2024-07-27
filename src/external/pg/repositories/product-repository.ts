import { ProductRepository } from '@/core/application/contracts/product-repository'
import { Product, ProductCategory } from '@/core/domain/product'
import { DbConnection } from '@/interfaces/db-connection'

export class PgProductRepository implements ProductRepository {
  constructor (private readonly db: DbConnection) {}

  async get (): Promise<Product[]> {
    return await this.db.query('select * from products')
  }

  async create (product: Omit<Product, 'id'>): Promise<Product> {
    const [createdProduct] = await this.db.query(
      `
        insert into products (name, price, category)
        values ($1, $2, $3)
        returning *
        `,
      [product.name, product.price, product.category]
    )
    return createdProduct
  }

  async update (id: string, product: Partial<Product>): Promise<Product> {
    const [updatedProduct] = await this.db.query(
      `update products set name = $1, price = $2, category = $3
        where id = $4
        returning *
            `,
      [product.name, product.price, product.category, id]
    )

    return updatedProduct
  }

  async remove (id: string): Promise<void> {
    await this.db.query('delete from products where id = $1', [id])
  }

  async getByCategory (category: ProductCategory): Promise<Product[]> {
    return await this.db.query('select * from products where category = $1', [
      category
    ])
  }
}
