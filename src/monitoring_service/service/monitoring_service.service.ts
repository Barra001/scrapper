import { MonitoringServiceInterface } from "./monitoring_service.service.interface";
import { MonitoringServiceEntity } from '../entities/monitoring_service.entity';


export class MonitoringService implements MonitoringServiceInterface {
    getStatus(): MonitoringServiceEntity {
        const status = new MonitoringServiceEntity();
        status.status.ableToReceiveRequests = true;
        return status;
    }
}