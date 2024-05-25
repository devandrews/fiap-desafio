import { User } from "@/core/domain/user";
import { UserRepository } from "@/core/application/contracts/user-repository";

export class UserService {
  constructor(private repository: UserRepository) {}

  async get(): Promise<User[]> {
    return this.repository.get();
  }

  async getByCpf(cpf: string): Promise<User> {
    return this.repository.getByCpf(cpf);
  }

  async create(user: Omit<User, "id">): Promise<User> {
    return this.repository.create(user);
  }
}
