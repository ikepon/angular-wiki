# index が使われるとき、使われないとき
## indexが使われる時
- フィールド値を定数と比較するとき (WHERE name = "hogehoge" )
- フィールド値全体でJOINするとき ( WHERE a.name = b.name )
- フィールド値の範囲を求める時
- LIKEでの前方一致
- MIN(), MAX() (複数要素indexの同一first fieldでsecond fieldのmin,max でも有効)
- 文字列のプレフィックスをもとにしたORDER BY, GROUP BY
- WHEREのすべてのフィールドがindexの一部の場合 (DBまったく参照されず)

## indexが使われない時
- DB全体を読んだ方が早いとMySQLが判断した時
  検索結果がテーブルの20%未満の場合。実務レベルでは10%を目安にするといい
- 検索テーブルが十分に大きい時
  数万-数十万が目安。データ量が少なければ、テーブルスキャン(全体検索)の方が速い
- 条件にindexを設定したカラムを使っていない
  検索対象の列が WHERE や JOIN の際の ON に利用されていない場合は利用できない
  また、インデックスを設定していても計算や関数で加工している場合は利用できない
  ex) `SELECT * FROM users WHERE age * 10 > 100;` 
  この場合は age だけにすれば使える `SELECT * FROM users WHERE age > 100 / 10;`
- カーディナリティが低い列を検索する時
  カーディナリティ(属性値にどのくらいの種類があるか)が高い(重複が少ない)場合はインデックスが利用できる
- LIKEによる後方一致、部分一致
  後方一致を使いたい場合は reverse() した値を別カラムに持つなどの工夫が必要
- 統計情報と実際のテーブルに乖離がある場合
  統計情報は定期的にテーブルからサンプリングをして作られるので、大量のデータ更新が行われた場合やサンプリングが偏ってしまった場合には乖離が生じる。
- 通常はindexはORDER BYには使われない
- WHERE と ORDER BYのフィールドが違う時にはどちらかしか使われない
  2つのカラムに別々にインデックスが設定してある。

参考: [MySQLパフォーマンスチューニングのためのインデックスの基礎知識](https://kiyotakakubo.hatenablog.com/entry/20101117/1289952549)
