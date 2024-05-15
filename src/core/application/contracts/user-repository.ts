import { User } from "@/core/domain/user";

export interface UserRepository {
  getByCpf(cpf: string): Promise<User>;

  create(user: Omit<User, "id">): Promise<User>;
}
