import { UserRepository } from "@/core/application/contracts/user-repository";
import { Express } from "express";

export class HttpUsersRoutes {
  constructor(
    private readonly app: Express,
    private readonly repository: UserRepository
  ) {}

  setup(): void {
    this.app.get("/users", async (_, res) => {
      const users = await this.repository.get();
      res.status(200).json({ data: users, total: users.length });
    });

    this.app.get("/users/:cpf", async (req, res) => {
      const { cpf } = req.params;
      const user = await this.repository.getByCpf(cpf);
      res.status(200).json({ data: user ? [user] : [] });
    });

    this.app.post("/users", async (req, res) => {
      const createdUser = await this.repository.create(req.body);
      res.status(201).json(createdUser);
    });
  }
}
