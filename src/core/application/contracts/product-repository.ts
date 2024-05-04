import { Product, ProductCategory } from "@/core/domain/product";

export interface ProductRepository {
  save(product: Omit<Product, "id">): Product;

  update(id: Pick<Product, "id">, product: Partial<Product>): Product;

  remove(id: Pick<Product, "id">): void;

  getByCategory(category: ProductCategory): Product[];
}
