# Timer azure function

## ローカルの設定
起動後すぐ動かすには、下記を`local.settings.json`に設定する
```json
  "TimerRunOnStartup": true
```

## ローカルで動かすには設定が必要
メッセージ

```
[2021-09-16T09:27:43.052Z] Cannot create directory for shared memory usage: /dev/shm/AzureFunctions
[2021-09-16T09:27:43.052Z] System.IO.FileSystem: Access to the path '/dev/shm/AzureFunctions' is denied. Operation not permitted.
[18:27:43] Found 0 errors. Watching for file changes.

[2021-09-16T09:27:44.054Z] The listener for function 'Functions.AwesomeRemind' was unable to start.
[2021-09-16T09:27:44.054Z] The listener for function 'Functions.AwesomeRemind' was unable to start. Microsoft.Azure.WebJobs.Script:Could not create BlobServiceClient to obtain the BlobContainerClient using Connection: Storage.
```

### azurite が必要らしい

### 感謝
[この記事](https://zenn.dev/ibaraki/articles/8bc72a15eb0d00)を元に解決

### 最終的に
local.settings.json に　設定すればよかった

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;"
  }
}
```

これでもいい
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  }
}
```

https://docs.microsoft.com/ja-jp/azure/storage/common/storage-use-azurite?tabs=visual-studio#http-connection-strings
