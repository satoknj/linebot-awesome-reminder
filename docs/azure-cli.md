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

## tmp
- Authorization: Developer Console で発行したトークン
- to: Developer Console の Basic settings の `Your user ID`

普通のメッセージ

```bash
curl -v -X POST https://api.line.me/v2/bot/message/push \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer XXX' \
-d '{
    "to":"XXX",
    "messages":[
        {
            "type":"text",
            "text":"Hello world"
        }
    ]
}'
```

ボタン付きのメッセージ
```bash
curl -v -X POST https://api.line.me/v2/bot/message/push \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer XXX' \
-d '{
    "to":"XXX",
    "messages":[
        {
          "type": "template",
          "altText": "Hello buttons template",
          "template": {
              "type": "buttons",
              "title": "Hello",
              "text": "Have you finished?",
              "actions": [
                  {
                    "type": "message",
                    "label": "Done",
                    "text": "done"
                  },
                  {
                    "type": "message",
                    "label": "Stop reminde",
                    "text": "stop"
                  }
              ]
          }
        }
    ]
}'
```
