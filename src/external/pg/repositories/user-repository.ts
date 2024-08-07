import { UserGatewayInterface } from '@/gateways/user'
import { User } from '@/entities/user'
import { DbConnection } from '@/interfaces/db-connection'

export class PgUserGatewayInterface implements UserGatewayInterface {
  constructor (private readonly db: DbConnection) {}

  async get (): Promise<User[]> {
    return await this.db.query('select * from users')
  }

  async getByCpf (cpf: string): Promise<User> {
    const [user] = await this.db.query('select * from users where cpf = $1', [
      cpf
    ])

    return user
  }

  async create (user: Omit<User, 'id'>): Promise<User> {
    const [createdUser] = await this.db.query(
      `
      insert into users (name, cpf, email)
      values ($1, $2, $3)
      returning *
      `,
      [user.name, user.cpf, user.email]
    )
    return createdUser
  }
}
