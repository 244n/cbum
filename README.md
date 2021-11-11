# cbum

## postgres DBの準備

``docker-compose.yml`が存在するディレクトリで`docker-compose up -d ` を実行してください。
PostgresのDokcerコンテナが起動します。

DBへの接続は`psql -h 127.0.0.1 -p 3001 -U postgres -d cbum`を実行して確認してください。