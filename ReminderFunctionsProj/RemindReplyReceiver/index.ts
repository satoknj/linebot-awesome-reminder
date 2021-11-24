import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as crypto from 'crypto';
import { SentMessageRepositoryImpl } from "../RemindDb";
import { PostBackData } from "./models";
import { receivePostback } from "./usecases";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const channelSecret = process.env.LinebotChannelSecret;
    const signature = crypto
      .createHmac('SHA256', channelSecret)
      .update(req.rawBody).digest('base64');
    
      if (signature === req.headers['x-line-signature']) {
          context.log('signature ok!')
          context.log(req.body.events[0])
          receivePostback(new PostBackData(req.body.events[0].data), new SentMessageRepositoryImpl());
      } else {
          context.log('signature ng...')
          context.log('signature is: ', signature)
      }
};

export default httpTrigger;