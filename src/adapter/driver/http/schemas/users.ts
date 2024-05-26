import { z } from "zod";

export const getUserRequestParamsSchema = z.object({
  cpf: z.string().length(11),
});

export const createUserRequestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.coerce.string().length(11),
});
