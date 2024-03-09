/* import { PlataformActivity } from "../entities/plataform_activities.entity";
import dotenv from "dotenv";
import axios from "axios";*/

export function logWorker(log: string): void {
 /* dotenv.config();
  const newRelicLogEndpoint = process.env.NEW_RELIC_ENDPOINT;
  const plataformActivity = JSON.parse(log) as PlataformActivity;
  const logLine = `user: ${plataformActivity.userResponsible} - log: ${plataformActivity.content}`;
  console.log(logLine);
  const headers = {
    "Content-Type": "application/json",
    "Api-Key": process.env.NEW_RELIC_LICENSE_KEY,

    "Accept-Encoding": "gzip, deflate, br",
  };

  await axios.post(
    newRelicLogEndpoint,
    JSON.stringify({
      timestamp: plataformActivity.datetime.toString(),
      message: logLine,
      logtype: plataformActivity.activityType,
      hostname: plataformActivity.hostname,
      service: "main-app",
    }),
    { headers }
  );*/
  console.log(log);
}
