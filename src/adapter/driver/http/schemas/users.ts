import { z } from '@/adapter/driver/validators/zod'

const userSchema = z.object({
  id: z.string().uuid().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
  name: z.string().openapi({
    example: 'John Doe'
  }),
  email: z.string().email().openapi({
    example: 'username@gmail.com'
  }),
  cpf: z.string().length(11).openapi({
    description: 'CPF must be 11 characters',
    example: '12345678901'
  })
})

// GET
export const getUsersResponseSchema = z.object({
  data: z.array(userSchema),
  total: z.number().int().openapi({
    example: 1
  })
})
export const getUserRequestParamsSchema = userSchema.pick({
  cpf: true
})

// POST
export const createUserRequestBodySchema = userSchema.omit({
  id: true
})
export const createUserResponseSchema = z.object({ data: userSchema })
