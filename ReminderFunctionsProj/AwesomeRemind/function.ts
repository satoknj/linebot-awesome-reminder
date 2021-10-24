import { Kind, RemindMessage, SentMessage, SentMessageRepository } from "./domain";
import * as dayjs from 'dayjs';
import timerTrigger from ".";

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
    
    remind(timestamp: dayjs.Dayjs) {
        const remindMessage = new RemindMessage();
        
        if (remindMessage.remindTiming.isRemindTiming(timestamp)) {
            this.linebotGateway.send(remindMessage);
            this.sentMessageRepository.create(
                remindMessage.toSentMessage(Kind.BreakfirstMedicine, timestamp)
            );
        }
    }
}
