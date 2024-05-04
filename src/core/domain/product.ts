export enum ProductCategory {
  LANCHE = "Lanche",
  ACOMPANHAMENTO = "Acompanhamento",
  BEBIDA = "Bebida",
  SOBREMESA = "Sobremesa",
}

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};
