# Rack
## Rack とは
Rack は、Ruby をサポートしている Webサーバ と Rubyフレームワーク の間の最小のインタフェースを提供します。

## Rack を立ち上げる

- `rackup` コマンドで Web サーバーが起動する
- `rackup` コマンドを実行するとデフォルトで同階層にある `config.ru` を読み込む
- `config.ru` には `run` メソッドが必要で、 `call` というインスタンスメソッドを持つインスタンスを渡す。
- `call` は1つの引数(一般的に `env` というっぽい)を取って、 `[ステータスコード(200), ヘッダー({ 'Content-Type' => 'text/plain' }), ボディ(['Hello world'])]` という3つを返すようにする必要がある

```ruby
# config.ru
class App
  def call(env)
    [200, {}, ['Hello world']]
  end
end

run App.new
```

- `call` の引数 `env` はこの辺の情報を持っている
  - [Rack applications](https://rubydoc.info/github/rack/rack/master/file/SPEC)

cf: 
  - [Rack: a Ruby Webserver Interface](http://rack.github.io/)
  - [エラーメッセージから学ぶRack - 最初の一歩](http://melborne.github.io/2012/08/02/build-your-own-web-framework-with-rack/)
