import { Kind, RemindedAt, RemindMessage, SentMessageRepository } from "../RemindDomain";
import * as dayjs from 'dayjs';

export interface LinebotGateway {
    send(remindMessage: RemindMessage, remindedAt: RemindedAt): void;
}

export class Reminder {
    private readonly linebotGateway: LinebotGateway;
    private readonly sentMessageRepository: SentMessageRepository;

    constructor(linebotGateway: LinebotGateway, sentMessageRepository: SentMessageRepository) {
        this.linebotGateway = linebotGateway;
        this.sentMessageRepository = sentMessageRepository;
    }
    
    remind(timestamp: dayjs.Dayjs) {
        const remindMessage = new RemindMessage();
        
        if (remindMessage.remindTiming.isRemindTiming(timestamp)) {
            this.linebotGateway.send(remindMessage, new RemindedAt(timestamp));
            this.sentMessageRepository.create(
                remindMessage.toSentMessage(Kind.BreakfirstMedicine, timestamp)
            );
        }
    }
}
