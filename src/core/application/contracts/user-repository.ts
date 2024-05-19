import { User } from "@/core/domain/user";

export interface UserRepository {
  get(): Promise<User[]>;

  getByCpf(cpf: string): Promise<User>;

  create(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
}
