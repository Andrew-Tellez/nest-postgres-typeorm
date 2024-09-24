import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'formato de correo inválido' }),
  password: z
    .string()
    .min(8, { message: 'la contraseña debe tener al menos 8 caracteres' }),
  role: z.union([z.literal('admin'), z.literal('user')], {
    message: 'rol inválido',
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
