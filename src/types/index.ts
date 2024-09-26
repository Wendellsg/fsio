import {
  type Appointment,
  AppointmentStatusEnum,
  ExerciseCategoryEnum,
  type Request,
  RequestStatusEnum,
  type RoutineFrequencyTypeEnum,
  RoutinePeriodEnum,
  UserRoleEnum,
} from "@prisma/client";

export interface OptionType {
  label: string;
  value: string;
}

export type AppointmentGetPayload = Appointment & {
  patient: {
    name: string;
    email: string;
    id: string;
    image: string;
  };

  professional: {
    id: string;
    profession: string;
    phone: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
  };
};

export type RequestWithUser = Request & {
  user: {
    name: string;
    email: string;
    id: string;
    image: string | null;
  };
};

export const translateAppointmentStatus = (status: AppointmentStatusEnum) => {
  switch (status) {
    case AppointmentStatusEnum.scheduled:
      return "Agendado";
    case AppointmentStatusEnum.canceled:
      return "Cancelado";
    case AppointmentStatusEnum.done:
      return "Realizado";
    default:
      return "";
  }
};

export const translateFrequencyType = (type: RoutineFrequencyTypeEnum) => {
  switch (type) {
    case "day":
      return "Dia";
    case "week":
      return "Semana";
    case "month":
      return "Mês";
    default:
      return "";
  }
};

export const translatePeriodType = (type: RoutinePeriodEnum) => {
  switch (type) {
    case RoutinePeriodEnum.morning:
      return "Manhã";
    case RoutinePeriodEnum.afternoon:
      return "Tarde";
    case RoutinePeriodEnum.night:
      return "Noite";
    default:
      return "";
  }
};

export function translateRequestStatus(status: RequestStatusEnum) {
  switch (status) {
    case RequestStatusEnum.accepted:
      return "Aceito";
    case RequestStatusEnum.pending:
      return "Pendente";
    case RequestStatusEnum.rejected:
      return "Rejeitado";
    default:
      return "";
  }
}

export function translateUserRole(role: UserRoleEnum) {
  switch (role) {
    case UserRoleEnum.admin:
      return "Administrador";
    case UserRoleEnum.professional:
      return "Profissional";
    case UserRoleEnum.patient:
      return "Paciente";
    default:
      return "";
  }
}

export function translateExerciseCategory(category: ExerciseCategoryEnum) {
  switch (category) {
    case ExerciseCategoryEnum.ankleAndFeet:
      return "Tornozelo e Pés";
    case ExerciseCategoryEnum.knees:
      return "Joelhos";
    case ExerciseCategoryEnum.hipAndPelvis:
      return "Quadril e Pélvis";
    case ExerciseCategoryEnum.thoracicAndLowBack:
      return "Torácica e Lombar";
    case ExerciseCategoryEnum.cervical:
      return "Cervical";
    case ExerciseCategoryEnum.fistsAndHands:
      return "Mãos e Punhos";
    case ExerciseCategoryEnum.shoulders:
      return "Ombros";
    case ExerciseCategoryEnum.elbowsAndForearms:
      return "Cotovelos e Antebraços";
    default:
      return "";
  }
}

export type Session = {
  id: string;
  name: string;
  email: string;
  image: string;
  roles: UserRoleEnum[];
};
