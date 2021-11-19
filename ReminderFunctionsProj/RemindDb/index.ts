import { SentMessage, SentMessageRepository, Kind, RemindedAt } from '../RemindDomain';
import * as dayjs from 'dayjs';
import  * as cosmos from '@azure/cosmos';

export function imDb() {
    console.log('I am DB');
}

const CONTAINER_ID = 'Sents';

class SentMessageContainer {
    readonly id: string;
    readonly kind: string;
    readonly message: string;
    readonly snoozes: string[];
    reply: string;

    constructor(sentMessage: SentMessage) {
        this.id = sentMessage.remindedAt.format();
        this.kind = sentMessage.kind.toString();
        this.message = sentMessage.message;
        this.reply = sentMessage.reply;
        this.snoozes = sentMessage.snoozes.map(x => x.format());
        ;
    }
}

abstract class CosmosDbRepository {
    protected readonly container: cosmos.Container;
    
    constructor(container?: cosmos.Container) {
        if (container === null) {
            const client = new cosmos.CosmosClient({
                endpoint: process.env.CosmosDbEndpoint,
                key: process.env.CosmosDbKey
            });
            
            const database = client.database(process.env.CosmosDbDatabaseId);
            this.container = database.container(CONTAINER_ID);
        } else {
            this.container = container;
        }
    }
}

export class SentMessageRepositoryImpl extends CosmosDbRepository implements SentMessageRepository {
    async find(remindedAt: RemindedAt, kind: Kind): Promise<SentMessage> {
        console.log(remindedAt.format());
        const item = await this.container
            .item(remindedAt.format(), kind)
            .read<SentMessageContainer>();
        const saved = item.resource;

        return new SentMessage(
            Kind[saved.kind],
            saved.message,
            RemindedAt.create(saved.id),
            saved.snoozes.map(snooze => dayjs(snooze)),
            saved.reply
        );
    }

    async create(sentMessage: SentMessage) {
        await this.container
            .items
            .create(new SentMessageContainer(sentMessage));
    }

    async update(sentMessage: SentMessage) {
        const item = new SentMessageContainer(sentMessage);
        await this.container
            .item(item.id, item.kind)
            .replace(item);
    }
}