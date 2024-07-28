export enum ProductCategory {
  LANCHE = 'Lanche',
  ACOMPANHAMENTO = 'Acompanhamento',
  BEBIDA = 'Bebida',
  SOBREMESA = 'Sobremesa',
}

export interface Product {
  id: number
  name: string
  category: ProductCategory
  price: number
  description: string
  images: string[]
}
