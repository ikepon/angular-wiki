# React で用いられる用語
React というより関数型プログラミングかも。

ただ、React では関数型プログラミングがよく使われているので、ここにまとめる。

## 関数型プログラミング
オブジェクト指向的な書き方だと、オブジェクト内部に状態を抱えてしまう。

JS では非同期で処理が行われるため、状態を保持することによって意図せず状態が変わったことに気づかず、動きが変になることがある。

それを防ぐために関数型プログラミングが好まれる

### HOF
Higher Order Function。高階関数としい、引数に関数を取ったり、返り値として関数を返すもの

### HOC
Higher Order Component。高階関数のコンポーネント版

### クロージャー(Closure)
関数閉包。
親関数スコープの変数を参照する関数のこと。

関数定義の戻り値を、その中で定義した関数にする。
その関数を実行すると c は関数内部の値として保持され、戻り値の関数が実行されるたびに加算されていく仕組み。

```typescript
const counterMaker = (initialCount) => {
  let c = initialCount;
  const increment = () => c++;
  return increment;
};

const count = counterMaker(1);
console.log(count(),count(),count()); //123
```

### ジェネレータ関数

```javascript
function* rangeGenerator(end, start = 0) {
  let n = 0;
 
  for (let i = start; i < end; i++) {
    n+=1;
    yield i; 
  }
}

const gen = rangeGenerator(3);
console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

return がないけど戻り値に関数を持ったオブジェクトが返ってる。

Redex-Saga で使ってるらしい。

# カリー化
複数の引数を取る関数をひとつだけ引数を取る関数に分割してネストさせること

```javascript
constmulti = (n,m) => n * m;
console.log(multi(2, 4)); // 8

const curriedMulti = n => { 
  return m => n * m;
} 
console.log(curriedMulti(2)(4));  // 8

const simpleCurriedMulti = n => m => n * m;
console.log(simpleCurriedMulti(2)(4));  // 8
```

## カリー化された関数の部分適用
```javascript
constmulti = n => m => n * m;
console.log(multi(3)(5)); // 15

const triple = multi(3);
console.log(triple(5)); // 15
```
