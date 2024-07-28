import { Product, ProductCategory } from '@/entities/product'

export interface ProductGatewayInterface {
  get: () => Promise<Product[]>
  create: (product: Omit<Product, 'id'>) => Promise<Product>
  update: (id: number, product: Partial<Product>) => Promise<Product>
  remove: (id: number) => Promise<void>
  getByCategory: (category: ProductCategory) => Promise<Product[]>
}
