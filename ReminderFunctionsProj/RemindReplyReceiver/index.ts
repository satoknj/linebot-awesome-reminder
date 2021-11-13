import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as crypto from 'crypto';
import * as db from '../RemindDb';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(req.body);
    console.log(typeof req.body.data);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    db.imDb();

    const channelSecret = process.env.LinebotChannelSecret;
    const body = req.rawBody;
    const signature = crypto
      .createHmac('SHA256', channelSecret)
      .update(body).digest('base64');
    
      if (signature === req.headers['x-line-signature']) {
          context.log('signature ok!')
      } else {
          context.log('signature ng...')
          context.log('signature is: ', signature)
      }
};

export default httpTrigger;