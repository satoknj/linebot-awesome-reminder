# azure cli
メモ

ここに書いてあることは vscode の拡張で解決できるかもしれない

## init azure

### function project
`func init ReminderFunctionsProj --typescript`

### function
`func new --name AwesomeRemind --template "Timer trigger"`

## azure への関数登録例

```bash
az group create \
    --name AzureFunctionsQuickstart-rg \
    --location japaneast

az storage account create \
    --name quickstartrg \
    --location japaneast \
    --resource-group AzureFunctionsQuickstart-rg \
    --sku Standard_LRS

az functionapp create \
    --resource-group AzureFunctionsQuickstart-rg \
    --consumption-plan-location japaneast \
    --runtime node \
    --runtime-version 12 \
    --functions-version 3 \
    --name azure-function-quickstart-rg \
    --storage-account quickstartrg
    
 func azure functionapp publish azure-function-quickstart-rg
```
