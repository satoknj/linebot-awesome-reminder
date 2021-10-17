import { SentMessage, SentMessageRepository } from '../AwesomeRemind/domain';
import * as dayjs from 'dayjs';
import  * as cosmos from '@azure/cosmos';

export function imDb() {
    console.log('I am DB');
}

const CONTAINER_ID = 'Sents';
const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]';

class SentMessageContainer {
    readonly id: string;
    readonly kind: string;
    readonly message: string;
    readonly snoozes: string[];
    readonly reply: string;

    constructor(sentMessage: SentMessage) {
        this.id = sentMessage.datetime.format(DATE_FORMAT);
        this.kind = sentMessage.kind.toString();
        this.message = sentMessage.message;
        this.snoozes = [];
        this.reply = '';
    }
}

export class SentMessageRepositoryImpl implements SentMessageRepository {
    async save(sentMessage: SentMessage) {
        const client = new cosmos.CosmosClient({
            endpoint: process.env.CosmosDbEndpoint,
            key: process.env.CosmosDbKey
        });
        
        const database = client.database(process.env.CosmosDbDatabaseId);
        const container = database.container(CONTAINER_ID);
        
        await container.items.create(new SentMessageContainer(sentMessage));
    }
}