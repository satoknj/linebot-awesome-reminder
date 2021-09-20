## shell で送信確認
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
