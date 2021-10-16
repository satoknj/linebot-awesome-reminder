import { AzureFunction, Context } from "@azure/functions"
import dayjs = require("dayjs");
import { Reminder } from "./function"
import { LinebotGatewayImpl } from "./linebot";
import { SentMessageRepositoryImpl } from "../RemindDb";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const ts = context.bindingData.timerTrigger;
    const now = dayjs(ts);
    
    const linebot = new LinebotGatewayImpl();
    const reminder = new Reminder(linebot, new SentMessageRepositoryImpl());
    reminder.remind(now);
};

export default timerTrigger;
