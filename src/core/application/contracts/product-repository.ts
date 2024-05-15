import { Product, ProductCategory } from "@/core/domain/product";

export interface ProductRepository {
  create(product: Omit<Product, "id">): Promise<Product>;

  update(id: string, product: Partial<Product>): Promise<Product>;

  remove(id: string): Promise<void>;

  getByCategory(category: ProductCategory): Promise<Product[]>;
}
