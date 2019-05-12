# Hooks
関数コンポーネントに Local State やライフサイクルといった React の機能を追加するもの

## State Hook
クラスコンポーネントの Local State に相当するものを関数コンポーネントでも遣えるようにする機能

```typescript
const [count, setCount] = useState(0);
setCount(100);
setCount(prevCount => prevCount + 1);
```

`useState()` は返り値として state 変数とそのセッター関数を返すので、それを受け取って名前をつける。
`useState()` の引数は初期値の設定ができる。

State Hook の変数は、 `useState()` したときにグローバルな配列に突っ込まれているだけ。
なので、 `if` とかの中に `useState()` を定義すると順番が狂ったりする。

そのため、最初の方でまとめて定義しておくことが定石になっている。

## Effect Hook
クラスコンポーネントのライフサイクルメソッド componentDidMount(), componentDidUpdate(), componentWillUnmount() に相当する機能を実現するもの

```typescript
useEffect(() => {
  doSomething();

  return clearSomething();
}, [watchVar]);
```

`useEffect()` の第一引数には、引数なしの関数を設定。
その関数の中身がコンポーネントのレンダリング前に実行される。
(例では `doSomething()` )

返り値は必須ではないが、設定するとコンポーネントのアンマウント直前に実行される。
(例では `clearSomething()` )

`watchVar` は監視する変数を表し、レンダリング後にこれが変更されると `doSomething()` が実行される。

第二引数の `[watchVar]` は省略すると毎回 `doSomething()` を実行。
空配列を渡すと、初回レンダリング時のみ `doSomething()` を実行。

## Ref Hook
DOM への参照のための ref オブジェクトを取得するためのもの

そのcurrent プロパティの値は変更可能でどんな値でも保持することができるので、インスタンス変数のように使える

ex) 任意のLocal Stateの前回レンダリング時の値を保持しておきたい場合
```typescript
const Counter: FC = () => {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef(0);
  const prevCount = prevCountRef.current;

  useEffect(() => {
    prevCountRef.current = count;
  });

  return <div>Now: {count}, before: {prevCount}</div>;
};
```

## Memo Hook
任意の計算結果を保持しておきたいときに使う

第二引数の配列に渡された変数が前回のレンダリング時と差分があれば、第一引数の実行結果が戻り値として返される

```typescript
 const memoValue = useMemo(() => calculateSomething(), [watchVar]);
```

また、パフォーマンス最適化のために使われることもある。

ex) 特定 の Props が変更されたときだけ任意の子コンポーネントの再レンダリングを行いたい場合

```typescript
const Parent: FC<{ a: string, b: string }> = ({ a, b }) => {
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  const child2 = useMemo(() => <Child2 b={b} />, [b]);

  return (
    <>
      {child1}
      {child2}
    </>
  )
};
```

## その他注意点
- Hooks は関数コンポーネントか Custom Hook の中のみ。クラスコンポーネントや React モジュール以外での使用は不可。
- Hooks の記述はその関数のトップレベル。条件分岐やループ、ネストした関数内の記述をするのは不可。
- Custom Hook の関数名は、 `useXxxx` のように必ず `use` から始める。  
( `eslint-plugin-react-hooks` という Hooks のための ESLint プラグインによるもの)

# 参考
- [フック API リファレンス](https://ja.reactjs.org/docs/hooks-reference.html)
