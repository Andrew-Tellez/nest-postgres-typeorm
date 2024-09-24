import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'formato de correo inválido' }),
  password: z
    .string()
    .min(8, { message: 'la contraseña debe tener al menos 8 caracteres' }),
});
export type signInDto = z.infer<typeof signInSchema>;
