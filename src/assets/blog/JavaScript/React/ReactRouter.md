# React Router メモ
React Router が提供する history や location や match といったオブジェクトをコンポーネント内部で使う
- URL からマッチする要素を抽出
- リダイレクトのために、コンポーネントに withRouter() という HOC を適用する  
-> 最終行でエクスポートするのは withRouter() でラップしたコンポーネントになる。

- history や location や match は withRouter() を適用したコンポーネント内の Props として渡される
-> react-router モジュールが提供するその型が RouteComponentProps
-> 定義を見ると、history と location と match が定義されており、元のコンポーネントの Props と合成している
```javascript
export interface RouteComponentProps<Params extends { [K in keyof Params]?: string } = {}, C extends StaticContext = StaticContext, S = H.LocationState> {
  history: H.History;
  location: H.Location<S>;
  match: match<Params>;
  staticContext?: C;
}
```

- histroy
  - `histroy.push('/')` : '/' にリダイレクト(履歴に残る)
  - `histroy.replace('/')` : '/' にリダイレクト(履歴に残らない)
クリックとか useEffect() に使える
```javascript
onClick={() => {
          history.push('/');
        }}
```
