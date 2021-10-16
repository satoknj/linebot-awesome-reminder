import { Kind, RemindMessage, SentMessage, SentMessageRepository } from "./domain";
import * as dayjs from 'dayjs';

export interface LinebotGateway {
    send(remindMessage: RemindMessage): void;
}

export class Reminder {
    private readonly linebotGateway: LinebotGateway;
    private readonly sentMessageRepository: SentMessageRepository;

    constructor(linebotGateway: LinebotGateway, sentMessageRepository: SentMessageRepository) {
        this.linebotGateway = linebotGateway;
        this.sentMessageRepository = sentMessageRepository;
    }
    
    remind(timpeStamp: dayjs.Dayjs) {
        const remindMessage = new RemindMessage();
        
        if (remindMessage.remindTiming.isRemindTiming(timpeStamp)) {
            this.linebotGateway.send(remindMessage);
            this.sentMessageRepository.save(
                new SentMessage(Kind.BreakfirstMedicine, remindMessage, timpeStamp)
            );
        }
    }
}
