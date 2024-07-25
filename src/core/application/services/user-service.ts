import { User } from '@/core/domain/user'
import { UserRepository } from '@/core/application/contracts/user-repository'

export class UserService {
  constructor (private readonly repository: UserRepository) {}

  async get (): Promise<User[]> {
    return await this.repository.get()
  }

  async getByCpf (cpf: string): Promise<User> {
    return await this.repository.getByCpf(cpf)
  }

  async create (user: Omit<User, 'id'>): Promise<User> {
    return await this.repository.create(user)
  }
}
