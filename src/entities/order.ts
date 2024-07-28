import { Product } from './product'

export enum OrderStatus {
  RECEBIDO = 'Recebido',
  EM_PREPARACAO = 'Em preparação',
  PRONTO = 'Pronto',
  FINALIZADO = 'Finalizado',
}

export type OrderItems = Pick<Product, 'id' | 'price'> & {
  quantity: number
}

export interface Order {
  id: number
  user_id: number | null
  products: OrderItems[]
  total: number
  status: OrderStatus
}
