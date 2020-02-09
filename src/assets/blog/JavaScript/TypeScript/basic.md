# TypeScript が好まれている理由
フロントエンド開発が大規模化してきている中で、適度な粒度でモジュール化され、読みやすいコードを書いていくことが必要になってきている。

つまり、各モジュールの依存関係により開発が進んでいくようになり、その依存関係を把握するのに TypeScript は重要な役割を果たしている。

また、VS Code での開発により補完機能やエラーの事前検知、コード整形など開発効率が格段に上がることも影響している。

# TypeScript の基本
- 静的型付け  
> プログラミング言語で書かれたプログラムにおいて、変数や、サブルーチンの引数や返り値などの値について、その型が、コンパイル時など、そのプログラムの実行よりも前にあらかじめ決められている、という型システムの性質のこと

[静的型付け(Wikipedia)](https://ja.wikipedia.org/wiki/%E9%9D%99%E7%9A%84%E5%9E%8B%E4%BB%98%E3%81%91)

- 型推論  
> 静的な型付けを持つ言語において、変数や関数シグネチャの型を明示的に宣言しなくても、初期化のための代入式の右辺値や関数呼び出し時の実引数などといった、周辺情報および文脈などから自動的に（暗黙的に）各々の型を決定する機構のこと

[型推論(Wikipedia)](https://ja.wikipedia.org/wiki/%E5%9E%8B%E6%8E%A8%E8%AB%96)

- Null 安全性
> null（ nil, None など）が原因で実行時エラーにならない仕組み

[null安全でない言語は、もはやレガシー言語だ](https://qiita.com/koher/items/e4835bd429b88809ab33)

## プリミティブ型
- number
- string
- boolean
- symbol
- null
- undefined

symbol はオブジェクトのキーに使われたりする。ただ、JSONへのパースができないので使われにくい。

## boolean の判定
- false: 0, ''(空文字), null, undefined
- true: 上記以外

## null と undefined
- undefined: その変数が定義されていないときの値
- null: 変数は定義されているが、値がない

## strictNullCheck オプション
`tsconfig.json` でこれを設定すると Null 安全性を保証してくれる。

参考: [strictNullChecks - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/intro/strictnullchecks)

## 型定義ファイル
`.d.ts` の拡張子で定義された型定義ファイル。

これがあれば JS で書かれたライブラリとかも TYpeScript にインポートして遣える

## DefinitelyTyped
有志のユーザーたちが自分の使いたいモジュールの型定義ファイルを作り、集めて提供しているプロジェクト

数が膨大なので、使いたい npm モジュールの前に `@types/` をつけて npm のサイトで検索。
または `yarn info @types/[module name]` すると、存在すれば表示される。

`yarn info` だと自前で用意されている場合は以下のメッセージが表示される。
> 『非推奨:このパッケージはフェイクで、オリジナルのライ ブラリが型定義ファイルを提供しているので、これをインストールする必要はありません』

最新のバージョンには対応していないなど、たまに問題があるので注意が必要

