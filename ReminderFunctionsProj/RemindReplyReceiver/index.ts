import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as crypto from 'crypto'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.log(req);
    context.log(req.body);

    const channelSecret = process.env.LinebotChannelSecret;
    const body = req.body;
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