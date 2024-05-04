import { User } from "@/core/domain/user";

export interface UserRepository {
  getUserByCpf(cpf: string): Promise<User>;

  createUser(user: Omit<User, "id">): Promise<User>;
}
