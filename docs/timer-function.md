# Timer azure function

## ローカルで動かすには設定が必要
メッセージ

```
[2021-09-16T09:27:43.052Z] Cannot create directory for shared memory usage: /dev/shm/AzureFunctions
[2021-09-16T09:27:43.052Z] System.IO.FileSystem: Access to the path '/dev/shm/AzureFunctions' is denied. Operation not permitted.
[18:27:43] Found 0 errors. Watching for file changes.

[2021-09-16T09:27:44.054Z] The listener for function 'Functions.AwesomeRemind' was unable to start.
[2021-09-16T09:27:44.054Z] The listener for function 'Functions.AwesomeRemind' was unable to start. Microsoft.Azure.WebJobs.Script: Could not create BlobServiceClient to obtain the BlobContainerClient using Connection: Storage.
```

