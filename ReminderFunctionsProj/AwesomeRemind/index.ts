import { AzureFunction, Context } from "@azure/functions"
import { botFunction } from "./function"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const ts = context.bindingData.timerTrigger;
    botFunction(ts)
};

export default timerTrigger;
