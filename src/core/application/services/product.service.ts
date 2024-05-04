import { Product, ProductCategory } from "@/core/domain/product";
import { ProductRepository } from "@/core/application/contracts/product-repository";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  save(product: Omit<Product, "id">): Product {
    return this.productRepository.save(product);
  }

  update(id: Pick<Product, "id">, product: Partial<Product>): Product {
    return this.productRepository.update(id, product);
  }

  remove(id: Pick<Product, "id">): void {
    return this.productRepository.remove(id);
  }

  getByCategory(category: ProductCategory): Product[] {
    return this.productRepository.getByCategory(category);
  }
}
