import { Kind, RemindedAt, Reply } from "../RemindDomain";

export class PostBackData {
    readonly action: Reply;
    readonly remindedAt: RemindedAt;
    readonly kind: Kind;
    
    constructor(data: string) {
        const reducer = (acc, cur) => {
            const keyValue = cur.split("=");
            acc[keyValue[0]] = keyValue[1];
            return acc;
        };
        const dataMap = data.split("&").reduce(reducer, {});
        this.action = Reply[dataMap['action']];
        this.remindedAt = RemindedAt.create(dataMap['timestamp']);
        this.kind = Kind[(dataMap['kind'])];
    }
}