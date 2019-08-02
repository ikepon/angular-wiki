# 開発の順番
1. ページをコンポーネントの階層構造に落とし込み、併せて各コンポーネントの Props を決 定する
2. どのコンポーネントを Container にするかを決め、その Local State および connect する Props を決定する
3. ページを構成する主要なコンポーネントを、スタイルガイドとして Storybook に登録する
4. Containerが発行するActionと発行に使うActionCreatorを作成、それに対応するReducerも併せて作る
5. そのActionが必要とするAPIハンドラを作成、ユニットテストも併せて書く
6. 4と5によるSagaを作成、ユニットテストも併せて書く
7. ContainerComponentを作成する
8. 正常系のE2Eテストを作成する

# 開発時の考え方
- Redux の Store の構造はドメインモデル
同じデータでもページごとに表示するものが異なってくる。
例えば、User 全体と フィルターのかかったユーザーたち

本来は Users がいて、ページごとにこの中身を変更していく

- セッション情報の保存
Local Storage に格納するのがメジャーになってきてる
Redux Persist って library がそれをやってくれる
