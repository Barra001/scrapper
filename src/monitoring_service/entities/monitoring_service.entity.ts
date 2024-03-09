
export class MonitoringServiceEntity {

    public status: {
        ableToReceiveRequests: boolean;
    };

    constructor() {
        this.status = {
            ableToReceiveRequests: false,
        };

    }
}



