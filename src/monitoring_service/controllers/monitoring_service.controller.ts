import { Request, Response } from "express";

import { MonitoringServiceInterface } from "./../service/monitoring_service.service.interface";




export class MonitoringServiceController {
    constructor(
        private readonly monitoringService: MonitoringServiceInterface,


    ) { }

    async getSystemStatus(req: Request, res: Response): Promise<void> {
        const status = await this.monitoringService.getStatus(
         );
        res.send(status);
    }
}
