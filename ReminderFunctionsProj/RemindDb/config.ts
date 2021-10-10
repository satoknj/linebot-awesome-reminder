export const config = {
    databaseId: process.env.CosmonsDbDatabaseId,
    containerId: 'Sents',
    partitionKey: { kind: 'Hash', paths: ['/kind'] }
};