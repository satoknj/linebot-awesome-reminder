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

abstract class CosmosDbRepository {
    protected readonly container: cosmos.Container;
    
    constructor(aContainer?: cosmos.Container) {
        if (aContainer === null) {
            const client = new cosmos.CosmosClient({
                endpoint: process.env.CosmosDbEndpoint,
                key: process.env.CosmosDbKey
            });
            
            const database = client.database(process.env.CosmosDbDatabaseId);
            this.container = database.container(CONTAINER_ID);
        } else {
            this.container = aContainer;
        }
    }
}

export class SentMessageRepositoryImpl extends CosmosDbRepository implements SentMessageRepository {
    async save(sentMessage: SentMessage) {
        await this.container
            .items
            .create(new SentMessageContainer(sentMessage));
    }
}