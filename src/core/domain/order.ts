import { Product } from "./product";

export enum OrderStatus {
  RECEBIDO = "Recebido",
  EM_PREPARACAO = "Em preparação",
  PRONTO = "Pronto",
  FINALIZADO = "Finalizado",
}

export type OrderItems = Pick<Product, "id" | "price"> & {
  quantity: number;
};

export type Order = {
  id: string;
  products: OrderItems[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};
