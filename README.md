# cbum

[Chris Bumstead](https://www.instagram.com/cbum/) に捧ぐ

## 概要

下記の登録・管理を行います

- 筋トレの種目(ベンチプレス、スクワット、デッドリフト、……)と鍛える対象の筋肉
- 筋肉と体の部位の包含関係
- 体の部位

## 事前準備

postgres コンテナの起動：

```bash
docker-compose up -d
```

`docker-compose.yml`が存在するディレクトリで を実行してください。
Postgres の Dokcer コンテナが起動します。

DB への接続：

```bash
psql -h 127.0.0.1 -p 4001 -U postgres -d cbum
```

依存関係のインストール：

```bash
npm i
```

##　テスト

テストの実行：

```bash
npm run test
```

テストの編集・追加：

- `tests/test.js` を編集
- 毎テスト開始前の初期化設定は`tests/initialize.js`を編集

## Swagger UI の自動作成

`swagger.js`を編集：

- お好みで `title`, `description`などを設定
- `host`：[your server]:[port]を指定
- `endpointsFiles`；Router の Root ファイルを相対パスで指定

下記のコマンドで`swagger.json`を  自動生成：

```bash
npm run start-gendoc
```

## サーバーの起動と API の実行

サーバーの起動確認：

```bash
nom run dev
```

Swagger（API リファレンス）へのアクセス：

- http://localhost:4000/doc/#/
