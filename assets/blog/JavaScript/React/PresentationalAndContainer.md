# Presentational Component と Container Component
会話では、それぞれ以下のように言うことが多い
- `Presentational Component` : コンポーネント
- `Container Component` : コンテナ

## Presentational Component
- 主に表示に関するコンポーネント
- 表示に関するものなので、HTMLタグを持つ
- コンポーネント内で使うデータは Props によって与えられる
- 状態は持たない
- データの変更を行わない
- 関数コンポーネントが使われることが多い

## Container Component
- 主に処理に関するコンポーネント
- 処理に関するものなので、HTMLタグをできる限り持たない
- Presentational Component で使うデータを必要に合わせて加工して渡す
- Flux の Action 実行や Store に依存する
- データの変更を行う
- HOC や Render Props, Hooks が使われることが多い

## Readt っぽいコンポーネントの作り方
1. 見た目だけを整えた Presentational Component を作成
2. それを import して Hooks や HOC で必要な機能を追加
3. 別途 Container Component を作成
