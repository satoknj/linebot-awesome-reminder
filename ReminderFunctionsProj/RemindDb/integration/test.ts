import * as fs from 'fs';
import  * as cosmos from '@azure/cosmos';
import { Kind, RemindedAt, SentMessage } from '../../RemindDomain';
import dayjs = require('dayjs');
import { SentMessageRepositoryImpl } from '..';

import * as cpf from 'dayjs/plugin/customParseFormat';
dayjs.extend(cpf)

function getContainer(): cosmos.Container {
    const data = fs.readFileSync('./local.settings.json', 'utf8');
    const obj = JSON.parse(data);

    const COSMOS_ENDPOINT = obj.Values.CosmosDbEndpoint;
    const COSMOS_KEY = obj.Values.CosmosDbKey;
    const COSMOS_DATABASE = obj.Values.CosmosDbDatabaseId;
    const CONTAINER_ID = 'Sents';

    const client = new cosmos.CosmosClient({
        endpoint: COSMOS_ENDPOINT,
        key: COSMOS_KEY
    });

    const database = client.database(COSMOS_DATABASE);
    return database.container(CONTAINER_ID);
}

const container = getContainer();
const sentMessageRepository = new SentMessageRepositoryImpl(container);

async function insert() {
    const item = new SentMessage(
        Kind.BreakfirstMedicine, 'test', dayjs('2021-10-22 06:22:05.234'), [], ''
    )
    await sentMessageRepository.create(item);
}

async function update(message: SentMessage) {
    await sentMessageRepository.updateReply(message, 'done');
}

async function main() {
    await insert();

    const remindedAt = new RemindedAt(dayjs('2021-10-22 06:22:05.234'));
    const message = await sentMessageRepository.find(remindedAt, Kind.BreakfirstMedicine);
    console.log(message);

    update(message);

    const updateMessage = await sentMessageRepository.find(remindedAt, Kind.BreakfirstMedicine);
    console.log(updateMessage);
    
    await container.item(updateMessage.remindedAt.format(), updateMessage.kind).delete();
}
main();