# スキーマ言語
リソースの単位であるtypeとその構成要素であるfieldが基本的な要素
- typeのバリエーション
  - interface
  - union type
  - enum
- 全体に関わる要素
  - directive
  - description


## Type
プログラミング言語における型やクラスみたいなもの。
複数のfieldからなる。
リソースに対するインターフェイスの記述

### null
デフォルトは nullable。typeのあとに `!` をつけると non-nullable

例)
`String` : nullableなString型
`String!` : non-nullableなString型

### 配列
型名を `[]` で囲むと配列。non-nullable にしたいなら `!` を追加

例)
`[String]` : nullableなString型のnullableな配列型
`[String!]!` : non-nullableなString型のnon-nullableな配列型

## Field
`名前: 型名` という公文で必ず型を指定

```
type Query {
  currentUser: User!
}

type User {
  id: ID!
  name: String!
}
```
- currentUserというfieldを持つQueryというtype
- id、nameというfieldを持つUserというtype
- 全ての型はnon-null
- IDとStringは組み込み型
- Queryはデータ取得系のクエリであるqueryのために予約されたtypeで、全てのqueryのルートとなるtype
- fieldは引数を設定できる。
  - 例えば、Relay Connectionというリスト型は、ページ送りのための引数を受け取ります。
  - また、IDからリソースを取得するフィールドも引数を受け取ります。
  
例えば、IDからUserを取得するフィールドは次のようになるでしょう。
これは、idに対応したUserを取得し、その型はnullableなので、おそらく対応するUserが存在しなければnullを返すのでしょう。

```
type Query {
  user(id: ID!): User
}
```

## Interface
対応する具体的なリソースを持たない抽象型

## Union
指定された複数の型のうち、いずれかの型
例えば、 `union StringOrInt = String | Int` というスキーマは「StringまたはIntのうち、いずれかの型」という意味の `StringOrInt` というunion型

## Scalar
ただひとつの値からなる型
`Int` : 符号付き整数（32bit）
`Float` : 浮動小数点数（64bit）
`String` : 文字列（UTF-8）
`Boolean` : 真偽値
`ID` : 一意なID / 値としてはStringと同じ

## Enum
特定の値のみを持つ型
例えば、組み込みscalar型であるBooleanをenumで宣言すると次のようになる
```
enum Boolean {
  true
  false
}
```

## Directive
スキーマやクエリに対してメタデータを与えるための宣言
例えば、@deprecatedは、fieldが非奨励であることを示すための組み込みdirectiveで、次のように使います。
```
type T {
  newName: String!
  oldField: String! @deprecated(reason: "Use `newField` instead.")
}
```

この@deprecated directiveをつけられたfieldを使うことはできますが、GraphiQLのエディタで警告が出たり、GraphiQLのリファレンスマニュアルで表示されなかったりするなど、ツールが解釈して該当fieldを使わないように促してくれます。

## Description
typeやfieldなどに対する「説明」で、ツールから利用できるドキュメント


# クエリ言語
Web APIリクエストにおいてどのようなデータを取得するかを表現したもの
- query(データ取得)
- mutation(データ更新)
- subscription(サーバーサイドイベントの購読)

それぞれのオペレーション型ごとにルート型が必要で、このルート型はリソースを表現したものではなく名前空間として使われます。

# Query
queryはデータ取得系のクエリで、ルート型はQueryです。RESTful APIのGETに相当します。

- スキーマ
```
# queryのルートオペレーション型であるQueryを定義する
type Query {
  # フィールドとしてはnon-nullableなUser型であるcurrentUserを持つ
  currentUser: User!
}

# User型のfieldはidとname
type User {
  id: ID!
  name: String!
}
```

- クエリ
```
# クエリの種類は`query`で、この操作全体にはGetCurrentUserという名前をつける
query GetCurrentUser {
  # ここに型（ここではQuery）から取得したいfieldのリストを書く
  # なおクエリに書くfieldは "selection" という

  # queryのルート型QueryのフィールドcurrentUser: User! を要求する
  currentUser {
    # ここには User type のselectionを必要なだけ書く

    id # idはID!型 (ID型の実体は文字列)
    name # nameはString!型
  }
}
```

- レスポンス
```
{
  "data": {
    "currentUser": {
      "id": "dXNlci80Mgo=",
      "name": "foo",
    }
  }
}
```

## Queryの命名
queryの命名としては、名詞またはデータ取得を示す動詞であることが多いようです
単にデータ取得であればgetやfindなどはつけずに名詞そのままにするのがGraphQL流


## オブジェクトグラフの表現
例えば、GitHub API v4で次のようなリクエストをしたいとします。
ログインユーザの所有リポジトリの、それぞれのリポジトリのフルネームとスター数

```
query GetStargazersCount {
  # viewerは現在ログイン中のユーザ（`User!`型）
  viewer {
    # repositoriesはログイン中のユーザがコミットしたリポジトリのリスト（`RepositoryConnection!`型）
    repositories(
      ownerAffiliations: OWNER, # ログインユーザがownerのリポジトリに限る
      first: 2, # 最初から数えて2つだけ取得（長いので2つだけ）
      orderBy: { field: STARGAZERS, direction: DESC }, # スターの数で降順
    ) {
      edges {
        node {
          nameWithOwner # "$name/$owner"
          stargazers { # 星をつけたユーザーのリスト（`StargazerConnection!`)
            totalCount # リストアイテムの総数
          }
        }
      }
    }
  }
}
```

# Mutation
データ更新系のクエリ

# Variables
GraphQLリクエストでは、クエリとは別にパラメータを渡すことができます。それが、variables

# Fragment
クエリを分割して定義し、再利用しやすくするための機能

fragmentは `fragment fragment名 on 型 { フィールドのリスト }` という構文で使って定義して、 `...fragment名` という構文で展開
