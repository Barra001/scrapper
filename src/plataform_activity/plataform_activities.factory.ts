import { PlataformActivitiesService } from "./service/plataform_activities.service";
import { PlataformActivitiesServiceInterface } from "./service/plataform_activities.service.interface";
import { Readable } from "stream";
export class PlataformActivitiesFactory {
  static create(stream: Readable): PlataformActivitiesServiceInterface {
    const plataformActivityService = new PlataformActivitiesService(stream);
    return plataformActivityService;
  }
}
