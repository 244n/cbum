# cbum

## postgres DB の準備

``docker-compose.yml`が存在するディレクトリで`docker-compose up -d ` を実行してください。
Postgres の Dokcer コンテナが起動します。

DB への接続は`psql -h 127.0.0.1 -p 3001 -U postgres -d cbum`を実行して確認してください。

## API

| method | url            | parameter | body                     | usage         |
| ------ | -------------- | --------- | ------------------------ | ------------- |
| POST   | `/api/muscles` | -         | `{"musclename":"test4"}` | create muscle |
