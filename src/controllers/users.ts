import {
  createUserRequestBodySchema,
  getUserRequestParamsSchema
} from '@/api/schemas/users'
import { User } from '@/entities/user'
import { UserUsecase } from '@/usecases/user'

export class UsersController {
  constructor (private readonly usecase: UserUsecase) {}

  async get () {
    const users = await this.usecase.get()
    return users
  }

  async getByCpf (cpf: string) {
    const parsedCpf = getUserRequestParamsSchema.parse({ cpf })
    const user = await this.usecase.getByCpf(parsedCpf.cpf)
    return user
  }

  async create (user: Omit<User, 'id'>): Promise<User> {
    const parsedUsers = createUserRequestBodySchema.parse(user)
    const createdUser = await this.usecase.create(parsedUsers)
    return createdUser
  }
}
