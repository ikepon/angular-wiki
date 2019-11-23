# シェルスクリプトの基本
- シバン
スクリプトを実行するためのインタプリタを指定するためのもの。
ファイルの最初に書く

```
#!/bin/bash
```

- 変数

```
# 変数の代入は = だが、前後のスペースはなし
var='hoge' 

# 変数の呼び出しは頭に $ が必要
echo $var
```

- 実行結果を変数に保存

```
# ``(バックスラッシュ) で囲むと実行結果を利用できる
var="`date +%Y%m%d`"
echo "$var"
```

- 演算
$(( )) の中に書く。
(( )) の中のスペースは自由っぽい
比較演算子を使う時、 0: false, 1: true になる

```
x=1
y=2
z=$(( x + y ))

echo "$z"
```

- 変数の演算
echo を使うと文字列の連結になる

  - expr(let)  
  計算結果は整数になる
```
str1="100"
str2="200"
expr "$str1" "+" "$str2"
```

  - bc  
  expr の結果は整数になる。小数まで扱いたいときは bc で処理する必要がある  
  また、パイプでつなげることで echo で文字列として渡ってきたものを数式として処理できる
```
str1="10.1"
str2="20.2"
echo $str1+$str2 | bc
```

- 条件式 if

```
# if ~ fi で囲んだところが条件式
# [ の前後はスペース。 ] の前はスペース。
# then だけで 1 行必要だが、 if の行にまとめて書きたいので ; を使って書いている
# if の中で変数を使うときは "" で囲む。これは変数がないときのエラーを回避するため
# 他の条件を書きたいときは elif

if [ "$var" = 1 ]; then
  echo "first"
elif [ "$var" = 2 ]; then
  echo "second"
else
  echo "other"
fi
```

- キーボードからの入力を受け付ける read

```
read str
echo $str

# -p でターミナルに案内を表示できる
read -p "Please press your name:" name
echo "Your name is $name."
```

- case

```
read str

# 条件 ) 実行したいコマンドで書く
# * で条件に合わないものをすべてキャッチできる
case "$str" in
  "first" ) echo "No 1" ;;
  "second" ) echo "No 2" ;;
  * ) echo "other" ;;
esca
```

- for

```
# in の中に繰り返す集合が入る
# do ~ done に実行コマンドを記載
for i in 0 1 2 3 4
do
  echo $i
done
```

- while (until は条件不成立の間実行)

```
# [ ] 内の条件を満たしている間は続ける
while [ "$str" = "" ]
do
  read str
done

# 無限ループにしたい場合は : を用いる
# その場合、抜けられなくなるので break を入れておく

while :
do
  read str
  
  if [ "$str" = "quit" ]; then
    break
  fi
done
```

- $?
コマンド実行後に終了ステータスが書き込まれる
0: 成功、それ以外はエラー

```
ls

echo $?
```
