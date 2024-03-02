import { z } from "zod";

export const userDataSchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório",
      coerce: true,
    })
    .min(4, "Nome deve ter no mínimo 4 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email("Formato de email inválido"),

  phone: z.string({
    required_error: "Campo obrigatório",
  }),
  height: z.coerce.number({
    coerce: true,
    description: "Altura em centímetros",
  }),
  weight: z.coerce.number({
    coerce: true,
    description: "Peso em quilogramas",
  }),
  role: z.string({
    required_error: "Campo obrigatório",
  }),
  birthDate: z.string(),
  introduction: z.string().nullable(),
  profession: z.string().nullable(),
  zipCode: z.string(),
  address: z.string(),
  addressNumber: z.string(),
  addressComplement: z.string(),
  addressNeighborhood: z.string(),
  addressCity: z.string(),
  addressState: z.string(),
  addressCountry: z.string(),
  professionalLicense: z.string().nullable(),
  professionalLicenseState: z.string().nullable(),
});

export type UserUpdateData = z.infer<typeof userDataSchema>;

export const routineDataSchema = z.object({
  description: z.string(),
  frequency: z.coerce.number(),
  frequencyType: z.string(),
  repetitions: z.coerce.number(),
  series: z.coerce.number(),
  period: z.string(),
  exerciseId: z.string().nullable(),
});

export type RoutineData = z.infer<typeof routineDataSchema>;

export const signUpDataSchema = z.object({
  name: z.string({
    required_error: "Campo obrigatório",
  }),
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email("Formato de email inválido"),
  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número"
    ),
  passwordConfirmation: z.string({
    required_error: "Campo obrigatório",
  }),
});

export type SignUpData = z.infer<typeof signUpDataSchema>;
