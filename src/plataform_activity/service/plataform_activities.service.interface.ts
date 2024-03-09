import { LogType } from "../entities/log-event";

export interface PlataformActivitiesServiceInterface {
  create(content: string, userResponsible: string, type: LogType): void;
}
