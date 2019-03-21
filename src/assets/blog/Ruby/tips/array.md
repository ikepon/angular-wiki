# 配列
<details>
<summary>配列 `[1, 2, 3, 4, 5]` から偶数のみを取り出すには？</summary>

```ruby
array = [1, 2, 3, 4, 5] 
array.select(&:odd?)
# => [1, 3, 5]

array
# => [1, 2, 3, 4, 5]

# 破壊的に変更したいなら !
array.select!(&:odd?)
# => [1, 3, 5]
array
# => [1, 3, 5]
```

ちなみに... `map` だと
```ruby
array = [1, 2, 3, 4, 5] 
array.map { |e| e if e.odd? }
# => [1, nil, 3, nil, 5]

array
# => [1, 2, 3, 4, 5]
```
</details>

---

<details>
<summary>配列 `[1, 2, 3, 4, 5]` から偶数のみを削除するには？</summary>

```ruby
array = [1, 2, 3, 4, 5] 
array.reject(&:odd?)
# => [2, 4]

array
# => [1, 2, 3, 4, 5]

# 破壊的に変更したいなら !
array.reject!(&:odd?)
# => [2, 4]
array
# => [2, 4]
```
</details>

---

<details>
<summary>配列 `[1, 2, 3, 4, 5]` の各要素を2倍したものを返すには？</summary>

```ruby
array = [1, 2, 3, 4, 5] 
array.map { |e| e * 2 }
# => [2, 4, 6, 8, 10]

array
# => [1, 2, 3, 4, 5]

# 破壊的に変更したいなら !
array.map! { |e| e * 2 }
# => [2, 4, 6, 8, 10]
array
# => [2, 4, 6, 8, 10] 
```
</details>

---

<details>
<summary>配列 `[1, 2, 3, 4, 5]` を偶数と奇数の2つの配列に分けるには？</summary>

```ruby
array = [1, 2, 3, 4, 5]
selected_array, rejected_array = array.partition(&:odd?)
# => [[1, 3, 5], [2, 4]]

selected_array
# => [1, 3, 5]

rejected_array
# => [2, 4]

array
# => [1, 2, 3, 4, 5]
```
</details>

---

<details>
<summary>配列 `[1, nil, 3, 4, nil]` から `nil` を削除するには？</summary>

```ruby
array = [1, nil, 3, 4, nil] 
# => [1, nil, 3, 4, nil]

array.compact
# => [1, 3, 4]

array
# => [1, nil, 3, 4, nil]

# 破壊的に変更したいなら !
```
</details>

---

## その他、たまに使うやつ
### `delete`
```ruby
fruits = %w[apple orange banana kiwi banana]
# => ["apple", "orange", "banana", "kiwi", "banana"]

fruits.delete('banana')
# => "banana"

fruits
# => ["apple", "orange", "kiwi"]
```

`delete` すると元の配列から指定したやつを削除し、削除したものを返してくれるので、「削除したい、かつ、それも使いたい」ってときに便利！

ただし、上の例でもあるように同じ要素が2つ以上あるときはすべて削除されるので注意が必要

---
参考: [マネーフォワード社内PRに見られるRubyの書き方について – (1) 配列の生成](https://moneyforward.com/engineers_blog/2018/12/12/ruby-code-1/)
