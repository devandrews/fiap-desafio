import { UserRepository } from "@/core/application/contracts/user-repository";
import { User } from "@/core/domain/user";
import { Knex } from "knex";

export class PgUserRepository implements UserRepository {
  constructor(private readonly db: Knex) {}

  async getUserByCpf(cpf: string): Promise<User> {
    const user = await this.db.select("*").from("users").where({ cpf }).first();

    return user;
  }

  async createUser(
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const [createdUser] = await this.db("users").insert(user).returning("*");

    return createdUser;
  }
}
