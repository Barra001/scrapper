import { Router } from "express";
import { Request, Response } from "express";
import multer from "multer";
import dotenv from "dotenv";
import { PlataformActivitiesServiceInterface } from "./plataform_activity/service/plataform_activities.service.interface";

type ExceptionFilterFunction = (
  error: Error,
  req: Request,
  res: Response,
  plataformActivity: PlataformActivitiesServiceInterface
) => void;

export class MulterField {
  constructor(name: string, maxCount: number) {
    this.name = name;
    this.maxCount = maxCount;
  }

  public name: string;
  public maxCount: number;
}

type EndPointFunction = (req: Request, res: Response) => Promise<void>;

export class AppRouterWrapper {
  constructor(
    exceptionFilterFunction: ExceptionFilterFunction,
    private readonly plataformActivity: PlataformActivitiesServiceInterface
  ) {
    this.router = new Router();
    dotenv.config();
    this.multer = multer({
      dest: process.env.FILES_TEMP_PATH,
      limits: AppRouterWrapper.filesLimits,
    });
    this.exceptionFilterFunction = exceptionFilterFunction;
  }

  private exceptionFilterFunction: ExceptionFilterFunction;
  private multer: multer.Multer;
  public router: Router;
  private static filesLimits = {
    files: 3,
  };

  private createFields(files: MulterField[]): multer.Field[] {
    const fields: multer.Field[] = [];
    files.forEach((file) => {
      fields.push({ name: file.name, maxCount: file.maxCount });
    });
    return fields;
  }
  public post(
    path: string,
    endPointFunction: EndPointFunction,
    files: MulterField[] = null
  ): void {
    if (files) {
      this.router.post(
        path,
        this.multer.fields(this.createFields(files)), //
        (req: Request, res: Response) =>
          endPointFunction(req, res).catch((err) =>
            this.exceptionFilterFunction(err, req, res, this.plataformActivity)
          )
      );
      return;
    }
    this.router.post(path, (req: Request, res: Response) =>
      endPointFunction(req, res).catch((err) =>
        this.exceptionFilterFunction(err, req, res, this.plataformActivity)
      )
    );
  }

  public get(path: string, endPointFunction: EndPointFunction): void {
    this.router.get(path, (req: Request, res: Response) =>
      endPointFunction(req, res).catch((err) =>
        this.exceptionFilterFunction(err, req, res, this.plataformActivity)
      )
    );
  }

  public put(path: string, endPointFunction: EndPointFunction): void {
    this.router.put(path, (req: Request, res: Response) =>
      endPointFunction(req, res).catch((err) =>
        this.exceptionFilterFunction(err, req, res, this.plataformActivity)
      )
    );
  }

  public delete(path: string, endPointFunction: EndPointFunction): void {
    this.router.delete(path, (req: Request, res: Response) =>
      endPointFunction(req, res).catch((err) =>
        this.exceptionFilterFunction(err, req, res, this.plataformActivity)
      )
    );
  }
}
