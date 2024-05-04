import { User } from "@/core/domain/user";
import { UserRepository } from "@/core/application/contracts/user-repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByCpf(id: string): Promise<User> {
    return this.userRepository.getUserByCpf(id);
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    return this.userRepository.createUser(user);
  }
}
