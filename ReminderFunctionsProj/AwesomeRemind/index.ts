import { AzureFunction, Context } from "@azure/functions"
import dayjs = require("dayjs");
import { Reminder } from "./function"
import { LinebotGatewayImpl } from "./linebot";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const ts = context.bindingData.timerTrigger;
    const now = dayjs(ts);
    context.log.info(now); // 2021-09-23T20:51:23.000Z
    
    const linebot = new LinebotGatewayImpl();
    const reminder = new Reminder(linebot);
    reminder.remind(now);
};

export default timerTrigger;
