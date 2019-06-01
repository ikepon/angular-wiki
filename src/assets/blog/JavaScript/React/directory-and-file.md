# 開発時のディレクトリ、ファイルの役割など
**※ 個人的なまとめになりますので、参考程度に見てください。**

※ 適宜、開発に合わせて更新していく予定

## 利用バージョン
TODO: あとでまとめる

## src のファイル、ディレクトリ
- actions
  - Redux のアクションを定義しておく。
    - Action Type と Action Creator は別ファイルに分けておく
  - Action Type
    - `Constants` をファイル名の最後につける, Action Creator は特になし。
      - ex) `src/actions/githubConstants.ts` と `src/actions/github.ts`
    - 複数の外部 API やサービスを使うことを考慮して、 Action の値のプレフィックスに `GITHUB/` とかをつけておくといい。
  - Action Creator
    - Saga で非同期処理を扱うため、一つのタスクに関して、開始、成功、失敗の3つの状態を持った Action を返す。
    - start, succeed, fail の引数は interface で定義する。
    

- components
  - Presentational Component を入れる。(基本的には FC で作ったものを入れておく。)
  - CSS もコンポーネントに合わせて、同じファイル名(拡張子違い)で保存
  - router から component として直接使う場合(引数がない場合)は、そのまま定義すれば良い。
  - `container` から呼ばれる場合は、 `interface` で受け渡される引数を定義して使う。
  - イメージ的には、 `container` から引数を受ける場合、それをそのまま表示するのみ。加工が必要な場合は `container` で行う。
  - 初期開発の際は、変数をダミーで渡して表示だけチェックということもできる。
  - 各 component で使われる共有の component (ATOMIC デザインでいう Atom みたいな) もここに入れておく
    - ただし、ディレクトリは別々に切っておいて、分けてもいいかも。(ページのcomponent: `pages` , 共有 component: `shared` or `atoms` )

- containers
  - Props に取得した Store State をマッピング。

- reducer.ts
  - actions で定義したアクションに対応するもの
  - interface で State を定義
  - その interface を元に initialState (初期値) を定義する
  - state と action を引数に取る Reducer を作成
  - actions で定義した type に合わせて戻す State を定義

- sagas
  - redux-saga のファイルを置く
  - actionにフックしてタスクを実行するので、対応するアクションに対してファイルを作成
  - run, watch, root の3つの関数を定義
    - run: 実行するもの
    - watch: 監視しておくアクションと実行する run を指定
    - root は最上位のタスク。これをSaga にわたすとアプリ起動時に同時に起動する
    - sagaの Effect API
      - select  
        Store State から必要なデータを取得する
      - put  
        Action Creator を実行して Action を dispatch する
      - take  
        特定の Action を待ち受ける
        - takeEvery: 渡されたタスクをすべて実行する
        - takeLatest: タスクが溜まっている場合は最新のものだけ実行する
      - call  
        外部の非同期処理関数をコール
      - fork
        自身とは別スレッドを起動し、そこで特定タスクを実行する。Taskオブジェクトを返す
      - join  
        fork の返り値の Task オブジェクトを指定して、そのタスクが完了するのを待つ
      - その他  
        https://redux-saga.js.org/docs/api/

- services
  - 外部サービスを利用した非同期処理などに使うファイルをおく
  - 外部サービス似合わせてディレクトリを作成(ex: github)
  - axios を使ってリクエストを作成
  - apiの baseUrl と timeout の interface を作成しておく  

- App.tsx  
  - ベースのレイアウトがあれば、ここで設定する。
  - `react-router` の設定もここで行う。ここで設定した `route` を元にページ遷移をしていく。
  - router で設定する component はページに合わせて `container` だったり、 `component` だったりする。

```typescript jsx
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:companyName/members" component={Members} />
      <Redirect to="/" />
    </Switch>
```
- Index.tsx  
  - `public/index.html` の `#root` にレンダリングするファイル。
  - `redux` 、 `redux-saga` , `react-router` とかの設定をする。
```typescript jsx
// saga middle ware を作成して、 storeにわたすことで Saga を有効にしてる
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

// 作成した store を Provider に渡してあげると遣えるようになる
ReactDOM.render( <Provider store={store}>
<BrowserRouter> <App />
</BrowserRouter>
</Provider>,
document.getElementById('root') as HTMLElement,
);

// ここでsagas で作成した rootSaga を渡して上げることで Saga の監視スレッドが起動する
sagaMiddleWare.run(rootSaga);
```
