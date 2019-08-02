# 命名規則(Naming convention)
- Class は名詞
  - 複数の単語を繋げる場合は 形容詞+名詞、名詞+名詞
- メソッド名は動詞、動詞+名詞
- 不可算名詞の使用はできるだけ避ける
単数、複数の扱いは単語で分けることが多い。
そのため、不可算名詞だと扱いに困る場合があるので、別単語で置き換えるなどできるだけ使わないようにする

# 上記をやっておくと、使うときに英文っぽくなる
```ruby
class Player
  def initialize
    # do something
  end
  
  def decide(solution)
    # do something
  end
end

player = Player.new

player.decide('solution')

```

# 参考
- [モデルやメソッドに名前を付けるときは英語の品詞に気をつけよう](https://qiita.com/jnchito/items/459d58ba652bf4763820)
- [外国人が語る：英語でクラスやメソッド等の名付け方](https://qiita.com/gazayas/items/3d352d1b6ec9a225c6f6)
