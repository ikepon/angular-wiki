# Redux
## 3つの原則
- Single source of truth  
信頼できる唯一の情報源
- State is read-only  
状態は読み取り専用  
Store の変更のためには必ず Action を発行する必要がある
- Changes are made with pure functions  
変更は純粋関数にて行われる

## 全体の流れ
- 何かしらイベントを起こす
- ActionCreator を使って、起こしたいアクションとパラメータ(inputとか)を渡して Action を作成
  - action は type を必ず持つ
  - ActionCreator は Action を作るのみ。dispatch などは行わない
```javascript
{
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}
```
- 作成した Action を Store に送る(dispatch)
  - Store: アプリケーションの状態(state)を保持している場所。アプリケーション内で一つ
  - State: アプリケーションの状態。
```javascript
dispatch(addTodo(text))
```
- Store の中にある Action に必要な State(アプリケーションの状態) と Action を dipatch された Action を Reducer に渡す
  - Reducer は Store の中にあるイメージ
- Reducer は現在の State と Action を元に新しい State を作成
  - actionとstateから、新しいstateを作成して返すメソッド
  - 副作用を起こさないよう state を更新するときは必ず新しい State を作成して返す
  - action の type に対応する処理を書いていく
  - Reducer のファイルは大きくなるので、 State ごとにファイルを分けて管理することが多い
```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case COMPLETE_TODO:
      return Object.assign({}, state, {
        todos: [
        ...state.todos.slice(0, action.index),
        Object.assign({}, state.todos[action.index],{
        completed: true
      }),
      ...state.todos.slice(action.index + 1)
    ]
  }) 
    default:
      return state
  }
}
```

- Reducer が作成した新しい state を Store に保存する

cf: https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7

## Action ファイル(ActionCreator)
※ 以下、個人開発時の書き方なので参考まで
- `src/actions/` 下層に action ファイルを作成
  - 扱うリソースごとなどによってファイルを分けるといいかも
  - enum を使って Action を定義し、それに合わせて ActionCreator 関数を定義する
  - type は必須なので、interface で type と扱う params を定義して処理するといいかも

```typescript
export enum CounterActionType {
  ADD = 'COUNTER/ADD',
  DECREMENT = 'COUNTER/DECREMENT',
  INCREMENT = 'COUNTER/INCREMENT',
}

export interface CounterAction {
  type: CounterActionType;
  amount?: number;
}

export const add = (amount: number): CounterAction => ({
  amount,
  type: CounterActionType.ADD,
});

export const decrement = (): CounterAction => ({
  type: CounterActionType.DECREMENT,
});

export const increment = (): CounterAction => ({
  type: CounterActionType.INCREMENT,
});
```

## Reducer ファイル(Reducer, 初期値, アクションを振り分けて実行処理)
- アクションの振り分けを行う
- `src/reducer.ts` で一括管理
  - Action の type によって振り分けを行っている
  - 各アクションは `(prevState, action) => newState` の純粋関数になっている

```typescript
import { Reducer } from 'redux';
import { CounterAction, CounterActionType } from './actions/counter';

export interface CounterState { 
  count: number;
}

export const initialState: CounterState = { count: 0 };

const counterReducer: Reducer<CounterState, CounterAction> = (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState => { 
  switch (action.type) {
    case CounterActionType.ADD: 
      return {
        ...state,
        count: state.count + (action.amount || 0), 
      };
    case CounterActionType.DECREMENT:
      return {
        ...state,
        count: state.count - 1, 
      };
    case CounterActionType.INCREMENT: 
      return {
        ...state,
        count: state.count + 1, 
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars 
      const _: never = action.type;
      return state; 
    }
  }
};

export default counterReducer;
```
## index.ts ファイル
- DOM のトップレベルで入れ子にしておく\
- 先程の Reducer 関数と State の初期値を `createStore()` に渡して Store を作成している
- それを react-redux の <Provider> に Props として Store を渡す
- 上記設定によって、その下の階層の component で Store にアクセスできるようになる

```typescript jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import counterReducer, { initialState } from './reducer';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './styles/semantic.min.css';

const store = createStore(counterReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
); 

serviceWorker.unregister();

```

## Container ファイルでの使い方
- 参照したい Store State (CounterState) をコンポーネントの Props にマッピング(mapStateToProps, 型: StateProps)
  - mapStateToProps: Store State おｗ受け取って Props を返す関数
- 使いたい Action を生成する Action Creator(actions) 関数を Props にマッピング(mapDispatchToProps, 型: DispatchProps)
  - mapDispatchToProps: Dispatcher を受け取って Props を返す関数
  - Props の関数名と Action Creator の関数名を同じにすることでプロパティ名をショートハンドで省略できる( `{ add, decrement, increment }` )
- `mapStateToProps` と `mapDispatchToProps` は何でもいいが、慣習的にこの名前にすることが多い
- 最終行の `connect()` という HOC でその二つの関数とマッピング対象のコンポーネントを引数に渡すと定義した Props へのマッピングが有効になる
- `connect` に `()` が2つある。これはカリー化された関数

```typescript jsx
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { add, decrement, increment } from '../actions/counter';
import Counter from '../components/Counter';
import { CounterState } from '../reducer';

interface StateProps { 
  count: number;
}

interface DispatchProps {
  add: (amount: number) => void;
  decrement: () => void;
  increment: () => void;
}

const mapStateToProps = (state: CounterState): StateProps => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
 bindActionCreators(
  { add, decrement, increment },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
