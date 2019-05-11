# 文字列

<details>
<summary>文字列 `"hello,world,ruby"` をカンマで区切った配列を作るには？</summary>

```ruby
s = "hello,world,ruby"
# => "hello,world,ruby"

s.split(",")
# => ["hello", "world", "ruby"]

s
# => "hello,world,ruby" 

# 破壊的methodはない !
s.split!(",")
# NoMethodError: undefined method `split!' for "hello,world,ruby":String

# 大事なことは、ここで `s.split(/,/)` みたいな正規表現を使わないこと。
# もちろん必要なときはあるが、今回のケースは必要ない。実行速度に差が出るので注意が必要。
```
</details>

---
