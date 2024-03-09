import { LogType } from "../entities/log-event";
import { PlataformActivity } from "../entities/plataform_activities.entity";

import { PlataformActivitiesServiceInterface } from "./plataform_activities.service.interface";
import { Readable } from "stream";

export class PlataformActivitiesService
  implements PlataformActivitiesServiceInterface
{
  constructor(private readonly stream: Readable) {}

  create(content: string, userResponsible: string, type: LogType): void {
    const plataformActivity = new PlataformActivity(
      type,
      content,
      userResponsible
    );

    this.stream.push(JSON.stringify(plataformActivity));
  }
}
