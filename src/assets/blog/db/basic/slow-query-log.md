# スロークエリログ
SQLの実行にかかった時間がしきい値を超え，かつ指定の行数以上の行をチェックするSQLを保存する仕組み

## 設定
```
$ cat /etc/my.cnf
[mysqld]
slow_query_log=1
long_query_time=1
log_queries_not_using_indexes=1
slow_query_log_file=/usr/local/var/mysql/slow_query.log
```

- `long_query_time`: SQLの実行に1秒以上かかったクエリを出力するように設定
- `log_queries_not_using_indexes`: インデックスを利用しなかった SQL を出力
- `slow_query_log_file`: ログの出力ファイル名を設定

|設定|設定内容|
|--- |--- |
|slow_query_log|スロークエリーログを出力する設定。デフォルト値は0。|
|long_query_time|スロークエリーログを出力する際のしきい値の設定。0秒~360024365の範囲で指定。小数点以下の値を指定することでμs単位まで指定が可能。0秒を指定することで発行されたSQLを全部保存することも可能。|
|log_queries_not_using_indexes|indexが未使用なクエリに関して記録をする設定。|
|slow_query_log_file|スロークエリーログが出力される先を指定。|

参考: [第7回　スロークエリーログを使って遅いクエリを収集する](http://gihyo.jp/dev/serial/01/mysql-road-construction-news/0007)

## 対策
- インデックスが使用されているかを確認し、使用されていなければ設定する

その他、こちらを参考にするといいかも
[MySQL スロークエリ リンク集](https://qiita.com/SuguruOoki/items/75b664942af3ff3c39ad)

## 注意点
- デフォルトは無効になので、設定を行わないと出力されない
- スロークエリーログの出力はファイル書き出しのため，Production環境のデータベースに設定した場合などは，性能が低下していないか確認しつつ進めてください。

