# Redux-Saga
- Redux の仕組みから独立して動く。
  - 実行させたい副作用を伴う非同期処理を「タスク」として登録
  - アプリ起動時にタスクの数だけ独立したスレッドのようなものが立上がってスタンバイする
  - Action が発行されると Dispatcher が Store と合わせて Saga の待機しているスレッドにも Action を渡す
  - Saga は該当するActionが来ると登録されたタスクを実行してその結果を Action Creator にわたす
  
## ファイルの構成
- `src/actions/`
  - `githubConstants.ts`
    - アクションの定義をここに置く 
    - アクションの定数を定義するので、 `githubConstants.ts` みたいなファイル名にしておく
    - Action Creator と Action Type を別ファイルに分ける
      - `import * as ActionType from './actions/githubConstants';` みたいにまとめてインポートできて使いやすい
    - 異なるドメインの複数サービス API を扱うなどのケースがあるので `GITHUB/` などのプレフィックスを付けるといい。

```typescript jsx
// githubConstants.ts
export const GET_MEMBERS_START = 'GITHUB/GET_MEMBERS_START';
export const GET_MEMBERS_SUCCEED = 'GITHUB/GET_MEMBERS_SUCCEED';
export const GET_MEMBERS_FAIL = 'GITHUB/GET_MEMBERS_FAIL';
```

  - `github.ts`
    - Action Creator もここに置く
    - Saga 用に一つの Action に対して start, succeed, fail の3つの状態を持った Action Creator 関数を定義する
    - 実際に使うときは `getMembers.start()、 getMembers.succeed()、getMembers.fail()` みたいな感じ

```typescript jsx
import { AxiosError } from 'axios';

import * as Model from '../services/github/models';
import * as ActionType from './githubConstants';

export interface GetMembersParams {
  companyName: string;
}

interface GetMembersResult {
  users: Model.User[];
}

export const getMembers = {
  start: (params: GetMembersParams) => ({
    type: ActionType.GET_MEMBERS_START,
    payload: params
  } as const),

  succeed: (params: GetMembersParams, result: GetMembersResult) => ({
    type: ActionType.GET_MEMBERS_SUCCEED,
    payload: { params, result }
  } as const),

  fail: (params: GetMembersParams, error: AxiosError) => ({
    type: ActionType.GET_MEMBERS_FAIL,
    payload: { params, error },
    error: true
  } as const)
};

export type GithubAction =
  | ReturnType<typeof getMembers.start>
  | ReturnType<typeof getMembers.succeed>
  | ReturnType<typeof getMembers.fail>;

```

  - `index.ts`
    - ここに参考にする interface を定義
    
 ```typescript jsx
export interface Action<Payload> {
  type: string;
  payload?: Payload;
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: { [key: string]: any } | null;
}

export interface ActionStart<ActionType, Params> {
  type: ActionType;
  payload?: Params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: { [key: string]: any } | null;
}

export interface ActionSucceed<ActionType, Params, Result> {
  type: ActionType;
  payload: {
    params: Params;
    result: Result;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: { [key: string]: any } | null;
}

export interface ActionFail<ActionType, Params, AnyError> {
  type: ActionType;
  payload: {
    params: Params;
    error: AnyError;
  };
  error: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: { [key: string]: any } | null;
}
```

- `reducer.ts`
  - ActionType の開始、成功、失敗に合わせて戻す State を設定してる。

- `src/sagas/github.ts`
runGetXxxxx, watchGetXxxxx, rootSaga という3つの関数を定義する
  - rootSaga: 最上位のタスクとなるもので、ここでfork されたタスクをアプリ起動に待ち受ける  
  これを Saga ミドルウェアに渡すと起動するようになる。
  - watchGetXxxxx: Action.GET_XXXXX_START という Action Type の Action を Dispatcher から渡されてこないか監視する。  
  ここで設定された Action を受け取ったら runGetXxxxx を実行する  
  タスク実行する関数は yield の中で Effect API を使う(代表的なものは以下)
```
・ select ...... Store State から必要なデータを取得する。
・ put ...... Action Creator を実行して Action を dispatch する。
・ take ...... 特定の Action を待ち受ける。
・ call ...... 外部の非同期処理関数をコールする。
・ fork ...... 自身とは別のスレッドを起動し、そこで特定のタスクを実行する。Task オブジェ
クトを返す。
・ join ...... fork の戻り値の Task オブジェクトを指定して、そのタスクが完了するのを待つ
```

その他のAPI はこちらを参照: https://redux-saga.js.org/docs/api/
  - runGetXxxx: タスク関数には引数として Action が渡ってくる。 Return Type で Action Creator の戻り値からの型推論で設定する。それによって payload の中身を取得できる  
  `call` で非同期関数を実行する場合、２つ目以降の引数がその関数を実行する際の引数になる。  
  成功の場合は `getXxxxx.succeed()` に必要なデータを渡して実行、Action を dispatch して完了
