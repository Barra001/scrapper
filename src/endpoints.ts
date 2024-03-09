import { AppExceptionFilter } from "./exception_filter/exception.filter";
import { AppRouterWrapper } from "./router.wrapper";

//controllers
import { ScrappeController } from "./scrapper/controllers/scrapper.controller";
import { MonitoringServiceController } from "./monitoring_service/controllers/monitoring_service.controller";

//services
import { PlataformActivitiesServiceInterface } from "./plataform_activity/service/plataform_activities.service.interface";
import { ScrapService } from "./scrapper/service/scrapper.service";
import { MonitoringService } from "./monitoring_service/service/monitoring_service.service";

export function initEndpoints(
  platformActivityService: PlataformActivitiesServiceInterface
): AppRouterWrapper {
  const RouterWrapper = new AppRouterWrapper(
    AppExceptionFilter.catch,
    platformActivityService
  );

  const scrapperService = new ScrapService(
    platformActivityService
  );

  const monitoringService = new MonitoringService();
  const scrapperController = new ScrappeController(scrapperService);

  const monitoringServiceController = new MonitoringServiceController(
    monitoringService
  );

  /*----------------------Scrapper----------------------*/
  RouterWrapper.get("/scrap", (req, res) => scrapperController.get(req, res));

  /*----------------------Monitoring----------------------*/
  RouterWrapper.get("/status", (req, res) =>
    monitoringServiceController.getSystemStatus(req, res)
  );

  return RouterWrapper;
}
