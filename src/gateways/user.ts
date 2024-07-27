import { User } from '@/entities/user'

export interface UserGatewayInterface {
  get: () => Promise<User[]>
  getByCpf: (cpf: string) => Promise<User>
  create: (user: Omit<User, 'id'>) => Promise<User>
}
