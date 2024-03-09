import { Request, Response } from "express";
import { AppException } from "./app.exception";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "./../plataform_activity/entities/log-event";

export class AppExceptionFilter {
  static catch(
    error: Error,
    req: Request,
    res: Response,
    plataformActivity: PlataformActivitiesServiceInterface
  ): void {
    let status = 500;
    if (error instanceof AppException) {
      status = (error as AppException).httpStatusCode;
    }
    if (status === 500) {
      plataformActivity.create(error.message, "System", LogType.error);
    }

    res.status(status).json({
      message: error.message,
      statusCode: status,
      path: req.url,
    });
  }
}
