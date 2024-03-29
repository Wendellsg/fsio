type DefaultError = {
  title: string;
  description: string;
};

export const DEFAULT_ERROS: Record<string, DefaultError> = {
  "invalid-token": {
    title: "Token inválido",
    description:
      "O token de fornecido é inválido ou está expirado. Por favor, tente novamente.",
  },
  "unknown-error": {
    title: "Erro desconhecido",
    description: "Ocorreu um erro desconhecido. Por favor, tente novamente.",
  },
  "invalid-credentials": {
    title: "Credenciais inválidas",
    description:
      "O email ou senha informados são inválidos. Por favor, tente novamente.",
  },
  "email-already-in-use": {
    title: "Email já em uso",
    description:
      "O email informado já está em uso. Por favor, tente novamente.",
  },
  "email-not-found": {
    title: "Email não encontrado",
    description:
      "O email informado não foi encontrado. Por favor, tente novamente.",
  },
  "password-too-short": {
    title: "Senha muito curta",
    description: "A senha informada é muito curta. Por favor, tente novamente.",
  },

  "invalid-email": {
    title: "Email inválido",
    description: "O email informado é inválido. Por favor, tente novamente.",
  },
  "user-not-found": {
    title: "Usuário não encontrado",
    description: "O usuário não foi encontrado. Por favor, tente novamente.",
  },
  "user-disabled": {
    title: "Usuário desativado",
    description: "O usuário foi desativado. Por favor, tente novamente.",
  },
  "operation-not-allowed": {
    title: "Operação não permitida",
    description: "A operação não é permitida. Por favor, tente novamente.",
  },
  "weak-password": {
    title: "Senha fraca",
    description: "A senha informada é fraca. Por favor, tente novamente.",
  },
};
