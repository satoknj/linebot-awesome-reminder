import * as fs from 'fs';
import  * as cosmos from '@azure/cosmos';
import { Kind } from '../../AwesomeRemind/domain';
import dayjs = require('dayjs');

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

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]';
async function insert() {
    const item = {
        id: dayjs('2021-10-22 06:22:05.234').format(DATETIME_FORMAT),
        kind: Kind.BreakfirstMedicine,
        message: 'test',
        reply: ''
    };
    await container.items.create(item);
}

async function query(): Promise<any> {
    const q = 'SELECT * from c WHERE c.id = "2021-10-22T06:22:05+09:00Z" AND c.kind = "breakfirstMedicine"';
    const ite = await container.items.query(q).fetchAll();
    return ite.resources.map(item => {
        return item;
    })[0];
}

async function update(message: any) {
    const updatedItem = {
        id: message.id,
        kind: message.kind,
        message: message.message,
        reply: 'done'
    }
    await container
        .item(updatedItem.id, updatedItem.kind)
        .replace(updatedItem);
}

async function main() {
    await insert();
    const message = await query();
    console.log(message);
    update(message);
    const updateMessage = await query();
    console.log(updateMessage);
    
    await container.item(updateMessage.id, updateMessage.kind).delete();
}
main();