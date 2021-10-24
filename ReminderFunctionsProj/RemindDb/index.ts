import { SentMessage, SentMessageRepository, Kind } from '../AwesomeRemind/domain';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import  * as cosmos from '@azure/cosmos';

export function imDb() {
    console.log('I am DB');
}

const CONTAINER_ID = 'Sents';

dayjs.extend(customParseFormat)
const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]';

class SentMessageContainer {
    readonly id: string;
    readonly kind: string;
    readonly message: string;
    readonly snoozes: string[];
    reply: string;

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
    async find(id: string, kind: Kind): Promise<SentMessage> {
        const item = await this.container
            .item(id, kind)
            .read<SentMessageContainer>();
        const saved = item.resource;

        return new SentMessage(
            Kind[saved.kind],
            saved.message,
            dayjs(saved.id, DATE_FORMAT),
            saved.snoozes.map(snooze => dayjs(snooze)),
            saved.reply
        );
    }

    async create(sentMessage: SentMessage) {
        await this.container
            .items
            .create(new SentMessageContainer(sentMessage));
    }

    async updateReply(sentMessage: SentMessage, reply: string) {
        const item = new SentMessageContainer(sentMessage);
        item.reply = reply;
        await this.container
            .item(item.id, item.kind)
            .replace(item);
    }
}