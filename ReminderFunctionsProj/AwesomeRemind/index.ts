import { AzureFunction, Context } from "@azure/functions"
import dayjs = require("dayjs");
import { botFunction, Reminder } from "./function"
import { LinebotGatewayImpl } from "./linebot";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const ts = context.bindingData.timerTrigger;
    const now = dayjs(ts);
    context.log.info(now);
    
    const linebot = new LinebotGatewayImpl();
    const reminder = new Reminder(linebot);
    reminder.remind(now);
    // botFunction(ts)
};

export default timerTrigger;
