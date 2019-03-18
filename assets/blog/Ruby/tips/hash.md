# ハッシュ

<details>
<summary>ハッシュ `{ 'Alice' => 50, 'Bob' => 60, 'Carol' => 90 }` から value が 60 以上のハッシュを作るには？</summary>

```ruby
hash = { 'Alice' => 50, 'Bob' => 60, 'Carol' => 90 }
# => {"Alice"=>50, "Bob"=>60, "Carol"=>90}

hash.select {|k, v| v >= 60 }
# => {"Bob"=>60, "Carol"=>90}

hash
# => {"Alice"=>50, "Bob"=>60, "Carol"=>90}

# 破壊的に変更したいなら !
hash.select! {|k, v| v >= 60 }
# => {"Bob"=>60, "Carol"=>90}

hash
# => {"Bob"=>60, "Carol"=>90} 
```
</details>

---

<details>
<summary>ハッシュ `{ foo: 'FOO', bar: nil, baz: 'BAZ' }` からキーが `foo, baz` のハッシュを作るには？</summary>

```ruby
hash = { foo: 'FOO', bar: 'BAR', baz: 'BAZ' }
# => {:foo=>"FOO", :bar=>"BAR", :baz=>"BAZ"}

# Ruby 2.5 以降(Railsには元からあった？)
hash.slice(:foo, :baz)
# => {:foo=>"FOO", :baz=>"BAZ"}

hash
=> {:foo=>"FOO", :bar=>"BAR", :baz=>"BAZ"}

# slice! は注意が必要！
# 指定したもの以外のハッシュを作る。しかも破壊的！
hash.slice!(:foo, :baz)
# => {:bar=>"BAR"}

hash
# => {:foo=>"FOO", :baz=>"BAZ"}
```
</details>

---

<details>
<summary>ハッシュ `{ foo: 'FOO', bar: nil, baz: 'BAZ' }` から value = nil のものを削除するには？</summary>

```ruby
hash = { foo: 'FOO', bar: nil, baz: 'BAZ' }
# => {:foo=>"FOO", :bar=>nil, :baz=>"BAZ"}

# Ruby 2.4 以降(Railsには元からあった？)
hash.compact
# => {:foo=>"FOO", :baz=>"BAZ"}

hash
# => {:foo=>"FOO", :bar=>nil, :baz=>"BAZ"}

# 破壊的に変更したいなら !
```
</details>

---


### その他、たまに使うやつ
#### `delete`
```ruby
hash = { foo: 'FOO', bar: 'BAR', baz: 'BAZ' }
# => {:foo=>"FOO", :bar=>"BAR", :baz=>"BAZ"}

hash.delete(:foo)
# => "FOO"

hash
# => {:bar=>"BAR", :baz=>"BAZ"}
```

`delete` すると元のハッシュから指定したやつを削除し、削除したものの value を返してくれるので、「削除したい、かつ、その value も使いたい」ってときに便利！


参考
- [マネーフォワード社内PRに見られるRubyの書き方について – (2) ハッシュの生成](https://moneyforward.com/engineers_blog/2019/01/23/ruby-code-2/) 
- [group_by](https://apidock.com/ruby/Enumerable/group_by)
