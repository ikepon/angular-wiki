# GraphQLとは
RESTful Web API（REST）の持つ問題を解決するために開発されたスキーマのあるWeb API規格
クエリ言語とスキーマ言語からなる
- クエリ言語
GraphQL APIのリクエストのための言語で3種類
  - データ取得系のquery
  - データ更新系のmutation
  - サーバーサイドからのイベントの通知であるsubscription
- スキーマ言語
GraphQL APIの仕様を記述するための言語
リクエストされたクエリは、スキーマ言語で記述したスキーマに従ってGraphQL処理系により実行されて、レスポンスを生成

Facebookによれば、GraphQL開発の動機は、モバイルアプリケーションで利用するオブジェクトグラフとAPIのレスポンスの構造に乖離（かいり）があり、これを改善するため

# 特徴
- クエリがレスポンスデータの構造と似ていて情報量が多いこと
- スキーマによる型付けにより型安全な運用ができること

# スキーマ、クエリの例
## スキーマの例
```
type Query {
  currentUser: User!
}

type User {
  id: ID!
  name: String!
}
```

- type Query
  - queryのための予約されたルートの型名
  - ただひとつのフィールドcurrentUserを持ち、User!は「nullにならないUser型」
- type User
  - nullにならないID型であるidフィールド
  - nullにならないString型であるnameフィールド

ひとつひとつのフィールドはリゾルバ（resolver）と呼ばれる関数がマッピングされます。
リゾルバは、オブジェクト（例えばUserのインスタンス）を引数として受け取り、そのオブジェクトのプロパティ（例えばUser#name）を返すシンプルな関数です。

## クエリの例
上記スキーマに対するクエリ
```
query GetCurrentUser {
  currentUser {
    id
    name
  }
}
```

- クエリの名前はGetCurrentUser
- クエリのタイプはquery（＝データ取得系）
- currentUserのidとnameを取得

これに対応するJSONのレスポンス
```json
{
  "data": {
    "currentUser": {
      "id": "dXNlci80Mgo=",
      "name": "foo",
    }
  }
}
```



# 参考
- [「GraphQL」徹底入門 ─ RESTとの比較、API・フロント双方の実装から学ぶ](https://employment.en-japan.com/engineerhub/entry/2018/12/26/103000)
- [GraphQL入門 - 使いたくなるGraphQL](https://qiita.com/bananaumai/items/3eb77a67102f53e8a1ad)
GraphQL の基本的な概念とページングに関係する Connection と Edge の仕組みの解説がまとまってる
- [GraphQL を RESTful API と比較しながら実装して理解する](https://tech.jxpress.net/entry/graphql-vs-rest)
> REST と GraphQL の違いは、 「リソースをどのような URL で定義するか」と「リソースをどのようなスキーマで定義するか」という違い
