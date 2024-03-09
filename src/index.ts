import { initServer } from "./server";
import { PlataformActivitiesFactory } from "./plataform_activity/plataform_activities.factory";
import { Readable } from "stream";
import { logWorker } from "./plataform_activity/loggers/loggingWorker";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  const loggerService = new Readable({
    read(): void {
      return;
    },
  });
  loggerService.setEncoding("utf8");
  loggerService.addListener("data", (data) => {
    void logWorker(data);
  });

  const plataformActivityService =
    PlataformActivitiesFactory.create(loggerService);

  await initServer(plataformActivityService);
})();
