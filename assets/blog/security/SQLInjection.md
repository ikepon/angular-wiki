# SQL インジェクション
ユーザーの入力などに SQL 文を追記することで、通常では触れることのできないDB情報にアクセス・改ざんしたり、DB消去などを行う攻撃

## 根本的解決
SQL 文の組み立てはすべてプレースホルダーにする

`params[:name] = "' OR 1 --"` を入れる

```ruby
Project.where("name = '#{params[:name]}'")

```

実際に実行される SQL は以下となり、すべての projects のレコードが取り出せる。

```SQL
SELECT * FROM projects WHERE name = '' OR 1 --'
```

最後の `--` はそれ以降に記述された SQL を無効化するので、SQL のエラーを発生しないようにしている
