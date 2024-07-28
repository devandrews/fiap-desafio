import { ProductGatewayInterface } from '@/gateways/product'
import { Product, ProductCategory } from '@/entities/product'
import { DbConnection } from '@/interfaces/db-connection'

export class PgProductGatewayInterface implements ProductGatewayInterface {
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
      `update products set name = $2, price = $3, category = $4, description = $5, images = $6
        where id = $1
        returning *
            `,
      [
        id,
        product.name,
        product.price,
        product.category,
        product.description,
        product.images
      ]
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
