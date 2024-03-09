import * as express from "express";
import { initEndpoints } from "./endpoints";
import dotenv from "dotenv";
import cors from "cors";
import { PlataformActivitiesServiceInterface } from "./plataform_activity/service/plataform_activities.service.interface";

export async function initServer(
  platformActivitiesService: PlataformActivitiesServiceInterface
): Promise<void> {
  dotenv.config();
  const port = process.env.API_PORT;

  const app = express.default();

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Expose-Headers", "*");
    next();
  });

  app.use(express.json());
  app.use((await initEndpoints(platformActivitiesService)).router);
  app.listen(port);

  console.log(`Main app started at http://localhost:${port}`);
}
