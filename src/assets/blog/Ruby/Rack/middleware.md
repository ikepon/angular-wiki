# Rack Middleware
Rack は middleware を使ってカスタマイズすることができる。

## Rack に middleware を追加する

- `config.ru` 内で `use` を使って呼び出す。
- middleware は `initialize` と `call` というインスタンスメソッドを持つ。
- `initialize` は1つ以上の引数をとり、1つ目は run に渡したインスタンス
- middleware で run に渡した app を加工して返すことによってカスタマイズが可能になる
- `call` は1つの引数(一般的に `env` というっぽい)を取って、 `[ステータスコード(200), ヘッダー({ 'Content-Type' => 'text/plain' }), ボディ(['Hello world'])]` という3つを返すようにする必要がある
- `use` は第一引数に middleware, 第二引数以降は処理に合わせて設定でき、middleware 側では initialize で取得できる。block の設定も可。
- `use` を複数使う場合は、前（下に書いた use）の middleware のインスタンスが渡ってくる
- `run` コマンドのあとにあるものを エンドポイント、 `use` にあるものを ミドルウェアということもある

```ruby
# config.ru
class App
  def call(env)
    [200, {}, ['Hello world']]
  end
end

class SampleMiddle
  def initialize(app, arg)
    p arg # 'middleware arg'
    @app = app
  end
  
  def call(env)
    status, headers, body = @app.call(env)
    [status, headers, body << ', Hello Middleware']
  end
end


use SampleMiddle, 'middleware arg'

run App.new
```

- Rails で使われている middleware は `bin/rails middleware` で見ることができる

cf:
  - [Rack, a modular Ruby webserver interface: Available middleware](https://rubydoc.info/github/rack/rack/#label-Available+middleware)
  - [Rails on Rack](https://guides.rubyonrails.org/rails_on_rack.html)

その他参考になりそうなもの
  - 認証系、ログインに使えそう
    - [UNDERSTANDING RACK APPS AND MIDDLEWARE](https://www.engineyard.com/blog/understanding-rack-apps-and-middleware)
