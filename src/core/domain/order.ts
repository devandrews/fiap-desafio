import { Product } from "./product";

export enum OrderStatus {
  RECEBIDO = "Recebido",
  EM_PREPARACAO = "Em preparação",
  PRONTO = "Pronto",
  FINALIZADO = "Finalizado",
}

export type Order = {
  id: string;
  products: Product[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};
