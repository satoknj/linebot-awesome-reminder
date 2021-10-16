import { Kind, SentMessage, SentMessageRepository } from '../AwesomeRemind/domain';
import * as dayjs from 'dayjs';
import  * as cosmos from '@azure/cosmos';

export function imDb() {
    console.log('I am DB');
}

const CONTAINER_ID = 'Sents';

export class SentMessageRepositoryImpl implements SentMessageRepository {
    async save(sentMessage: SentMessage) {
        const client = new cosmos.CosmosClient({
            endpoint: process.env.CosmosDbEndpoint,
            key: process.env.CosmosDbKey
        });
        
        const database = client.database(process.env.CosmosDbDatabaseId);
        const container = database.container(CONTAINER_ID);
        
        await container.items.create(sentMessage);
    }
}