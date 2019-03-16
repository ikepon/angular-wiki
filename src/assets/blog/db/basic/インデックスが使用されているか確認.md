# EXPLAIN でクエリー実行計画を取得する
EXPLAIN は、クエリー実行計画 (つまり、MySQL がクエリーをどのように実行するかの説明) を取得するために使用

参考: [MySQL 5.6 リファレンスマニュアル  /  ...  /  EXPLAIN 構文](https://dev.mysql.com/doc/refman/5.6/ja/explain.html)

# EXPLAIN 出力カラム
|カラム|意味|
|--- |--- |
|id|SELECT 識別子。|
|select_type|SELECT 型|
|table|出力行のテーブル|
|partitions|一致するパーティション|
|type|結合型|
|possible_keys|選択可能なインデックス|
|key|実際に選択されたインデックス|
|key_len|選択されたキーの長さ|
|ref|インデックスと比較されるカラム|
|rows|調査される行の見積もり|
|filtered|テーブル条件によってフィルタ処理される行の割合|
|Extra|追加情報|


# 速度改善で大切なもの
## possible_keys
テーブル内の行の検索に使用するために選択できるインデックス

このカラムは EXPLAIN の出力に表示されたテーブルの順序にまったく依存しません。
つまり、possible_keys のキーの一部は、生成されたテーブルの順序で実際に使用できないことがあります。

このカラムが NULL の場合は、関連するインデックスがありません。

参考: [MySQL 5.6 リファレンスマニュアル  /  ...  /  EXPLAIN 出力フォーマット](https://dev.mysql.com/doc/refman/5.6/ja/explain-output.html)

## key
実際に使用することを決定したキー (インデックス)

key は possible_keys 値に存在しないインデックスを指定している可能性があります。
これは possible_keys インデックスのどれも行のルックアップに適していない場合に発生する可能性がありますが、クエリーによって選択されるすべてのカラムはほかのインデックスのカラムになります。

つまり、指定されたインデックスは選択されたカラムをカバーするため、取得する行を決定するために使用されませんが、インデックススキャンはデータ行スキャンよりも効率的です。

## row
MySQL がクエリーを実行するために調査する必要があると考える行数

## Extra
MySQL がクエリーを解決する方法に関する追加情報

詳細は[こちら](https://dev.mysql.com/doc/refman/5.6/ja/explain-output.html#explain-extra-information)

# MENTORの原則
- Measure（測定）
  スロークエリログやDBパフォーマンスなどをモニタリング
- Explain（解析）
  実行計画を見てクエリが遅くなっている原因を追求
- Nominate（指名）
  ボトルネックの原因(indexの未定義など)を特定
- Test（テスト）
  ボトルネックの改善を実施し、処理時間を測定。改善前後で比較。
- Optimize（最適化）
  DBパラメータの最適化を定期的に実施し、インデックスがキャッシュメモリに乗るように最適化
- Rebuild（再構築）
  統計情報やインデックスを定期的に再構築
