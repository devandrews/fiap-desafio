import { Product, ProductCategory } from "@/core/domain/product";
import { ProductRepository } from "@/core/application/contracts/product-repository";

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async get(): Promise<Product[]> {
    return this.repository.get();
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    return this.repository.create(product);
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return this.repository.update(id, product);
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }

  async getByCategory(category: ProductCategory): Promise<Product[]> {
    return this.repository.getByCategory(category);
  }
}
