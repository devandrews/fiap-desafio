import { ZodError } from "zod";
import { Express } from "express";

import { UserService } from "@/core/application/services/user-service";
import {
  createUserRequestBodySchema,
  getUserRequestParamsSchema,
} from "../schemas/users";

export class HttpUsersRoutes {
  constructor(
    private readonly app: Express,
    private readonly service: UserService
  ) {}

  setup(): void {
    this.app.get("/users", async (_, res) => {
      const users = await this.service.get();
      res.status(200).json({ data: users, total: users.length });
    });

    this.app.get("/users/:cpf", async (req, res) => {
      try {
        const { cpf } = getUserRequestParamsSchema.parse(req.params);
        const user = await this.service.getByCpf(cpf);
        res.status(200).json({ data: user ? [user] : [] });
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post("/users", async (req, res) => {
      try {
        const body = createUserRequestBodySchema.parse(req.body);
        const createdUser = await this.service.create(body);
        res.status(201).json(createdUser);
      } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
      }
    });
  }
}
