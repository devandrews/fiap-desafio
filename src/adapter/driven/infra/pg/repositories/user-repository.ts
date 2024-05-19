import { Knex } from "knex";

import { UserRepository } from "@/core/application/contracts/user-repository";
import { User } from "@/core/domain/user";

export class PgUserRepository implements UserRepository {
  constructor(private readonly db: Knex) {}

  async get(): Promise<User[]> {
    return await this.db("users");
  }

  async getByCpf(cpf: string): Promise<User> {
    const user = await this.db.select("*").from("users").where({ cpf }).first();

    return user;
  }

  async create(
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const [createdUser] = await this.db("users").insert(user).returning("*");

    return createdUser;
  }
}
