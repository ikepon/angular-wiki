# [chartable](https://github.com/rubyhero/chartable)
A lightweight and database-level Ruby library to transform any Active Record query into analytics hash ready for use with any chart library.

## クラスの関連
`Chartable::ActiveRecordExtension` でこの gem のクラスメソッド `analytics` を定義して、 `ActiveRecord::Base.send(:include, Chartable::ActiveRecordExtension)` で ActiveRecord に突っ込んでる。

1 引数 `period` を取り、 `Chartable::PeriodQuery` でその引数に該当するクラスを割り当てる
2 `Chartable::RangeQuery` で対象modelの指定カラム(default: created_at)における指定期間の scope を取得
3 1で割り当てられたクラスを使ってデータを取得

## メモ
- `Chartable::ActiveRecordExtension` で `yearly` クラスメソッドとかを定義してもいい気がしたけど、モデルによってはすでに定義されていたりして名前の重複が起こりそうな感じもある。だから `analytics` の引数で取るようにしてるんだと思う。
