import { UserRepository } from "@/core/application/contracts/user-repository";
import { Express } from "express";

export class HttpUsersRoutes {
  constructor(
    private readonly app: Express,
    private readonly repository: UserRepository
  ) {}

  setup(): void {
    this.app.get("/users", async (req, res) => {
      const users = await this.repository.get();

      res.status(200).json({ data: users, total: users.length });
    });
  }
}
