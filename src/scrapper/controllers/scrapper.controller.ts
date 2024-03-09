import { Request, Response } from "express";
import { ScrapperServiceInterface } from "../service/scrapper.service.interface";

export class ScrappeController {
  constructor(private readonly scrapperSevice: ScrapperServiceInterface) {}

  async get(req: Request, res: Response): Promise<void> {
    const urlToScrap = req.header("url");
    const result = await this.scrapperSevice.scrap(urlToScrap);
    res.json(result);
  }
}
