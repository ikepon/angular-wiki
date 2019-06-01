# React のテスト
## テストの実施方針
- ロジックのテストはちゃんとやる
  - API ハンドラ
  - Redux-Sage など
- コンポーネントは Storybook にストーリー登録した Presentational Component のスナップショットテストを行う
- E2E テストは正常系に限って行う

## Jest で API ハンドラのテスト
create-react-app には jest というテストフレームワークが `react-script` に準備されてる

Facebook が提供する React 公式のテストツール

- 非同期通信は axios を使っているので mock 用のライブラリをインストール
```console
yarn add -D axios-mock-adapter
```

- ESLint にテストファイルを除外させる( `.eslintrc.js` )
```js
'import/no-extraneous-dependencies': [
  'error',
  {
    devDependencies: [
     '.storybook/**',
     'stories/**',
     '**/*/*.story.*',
     '**/*/*.stories.*',
     '**/__specs__/**',
     '**/*/*.spec.*',
     '**/__tests__/**',
     '**/*/*.test.*',
    ]
  }
],
```

- Unit テストファイルは対象ファイルと同階層に置く


## Redux Saga のテスト
Redux Saga Test Plan を使ってテストする
- インストール

```
 yarn add -D redux-saga-test-plan@beta
```

## StoryShots でスナップショットテスト
StoryShots を入れておくと Storybook に登録したコンポーネントは自動でスナップショットが取れる
※ React 公式から `react-test-renderer` というパッケージが提供されているので、それを Jest と組み合わせて使えるがコンポーネントごとにテストするのは辛いので上記を使う

- インストール
```
yarn add -D @storybook/addon-storyshots @types/storybook__addon-storyshots react-test-renderer
yarn add -D require-context.macro babel-plugin-macros babel-loader
```

- `.storybook/config.js` の設定を変更
```diff
  import {configure, addDecorator} from '@storybook/react';
  import {withInfo} from '@storybook/addon-info';
  import {withKnobs} from '@storybook/addon-knobs';
+ importrequireContextfrom'require-context.macro';

  import '../src/styles/semantic.min.css';
  import '../src/index.css';

- constreq=require.context('../src/components',true,/.(story|stories).tsx$/);
+ constreq=requireContext('../src/components',true,/.(story|stories).tsx$/);
```

- `src/components/storyshots.test.ts` ファイルを作成
```typescript
import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({});
```

## Cypress を使って E2E テスト
- インストール
```
 yarn add -D cypress
```

- `.eslintrc.js` を修正
cy とか Cypress とかを no-undef に違反してると怒られるので追加
```js
  globals: {
    Atomics: 'readonly',
+   cy: 'readonly',
+   Cypress: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
},
```

- `.eslintignore` を作成
Cypress のプラグインやサンプルコードを ESLint の対象から外すため
```
node_modules/
cypress/plugins/
cypress/integration/examples
```

- `package.json` に npm script のエントリーを追加
```json
"scripts": {
  ...,
  "test": "react-scripts test",
  "test:coverage": "npm test -- --coverage",
+ "cypress": "cypress open",
+ "cypress:run": "cypress run",
+ "storybook": "start-storybook -p 6006",
}
```

- `yarn cypress` で Cypress が起動する
するとルートに `cypress/` というディレクトリができる

そのディレクトリ内に `tsconfig.json` を作成する
```json
{
  "compilerOptions": {
    "strict": true,
    "module": "esnext",
    "moduleResolution": "node",
    "baseUrl": "../node_modules",
    "target": "es5",
    "lib": ["esnext", "dom"],
    "types": ["cypress"]
  },
  "include": [
    "**/*.ts"
  ]
}
```

- `cypress.json` に環境変数を設定する
```json
{
  "env": {
  "baseUrl": "http://localhost:3000" }
}
```
