import { SentMessageRepository } from "../RemindDomain";
import { PostBackData } from "./models";

export async function receivePostback(postback: PostBackData, sentMessageRepository: SentMessageRepository) {
    const sentMessage = await sentMessageRepository.find(postback.remindedAt, postback.kind);
    sentMessage.reply = postback.action;
    sentMessageRepository.update(sentMessage);
}