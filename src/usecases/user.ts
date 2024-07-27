import { User } from '@/entities/user'
import { UserGatewayInterface } from '@/gateways/user'

export class UserUsecase {
  constructor (private readonly repository: UserGatewayInterface) {}

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
