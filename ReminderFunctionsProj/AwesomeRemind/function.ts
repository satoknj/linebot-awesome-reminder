import { RemindMessage } from "./domain";
import * as dayjs from 'dayjs';

export interface LinebotGateway {
    send(remindMessage: RemindMessage): void;
}

export class Reminder {
    private readonly linebotGateway;

    constructor(linebotGateway: LinebotGateway) {
        this.linebotGateway = linebotGateway;
    }
    
    remind(timpeStamp: dayjs.Dayjs) {
        const remindMessage = new RemindMessage();
        
        if (remindMessage.remindTiming.isRemindTiming(timpeStamp)) {
            this.linebotGateway.send(remindMessage);
        }
    }
}
