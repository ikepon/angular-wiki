# Storybook
TypeScript をサポートしてる
https://storybook.js.org/docs/configurations/typescript-config/

React App での遣い方を見ていく

- install
```console
yarn add @storybook/react @types/storybook__react react-docgen-typescript-webpack-plugin
```

- プロジェクトルートに `.storybook/` というディレクトリを作成
その中に以下の内容の `webpack.config.js`, `config.js` を作成

この方法では `stories/` 以下にファイルをまとめるのではなく、各コンポーネント内に `xxx.story.tsx` みたいなファイルを置いて管理する

また、このアプリで使ってる Semantic UI CSS とアプリの index.css を読み込んでいる

```js
// webpack.config.js
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
        }
      },
      { loader: require.resolve('react-docgen-typescript-loader') }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
}
```

```js
// config.js
import { configure, addDecorator } from '@storybook/react';

import '../src/styles/semantic.min.css';
import '../src/index.css';

const req = require.context('../src/components', true, /.(story|stories).tsx$/);

function loadStories() { 
  req.keys().forEach(req);
}

configure(loadStories, module);
```

- package.json に npm script を追加
```
"scripts": {
  ...,
+ "storybook": "start-storybook -p 6006",
+ "build:storybook": "build-storybook -o build/storybook"
},
```

※ `eslint-config-airbnb` を導入している場合は `devDependencies` に設定してある `@storybook/react` をインポートしようとすると怒られるのて、 `.eslintrc.js` に以下のルールを追加

```
'import/no-extraneous-dependencies': [
 'error',
  {
    devDependencies: [
      '.storybook/**',
      'stories/**',
      '**/*/*.story.*',
      '**/*/*.stories.*'
    ] 
  }
],
```

- その他、いろいろ拡張するためのアドオン
```console
yarn add -D @storybook/addon-a11y @types/storybook__addon-a11y @storybook/addon-actions @types/storybook__addon-actions @storybook/addon-info @types/storybook__addon-info @storybook/addon-knobs@types/storybook__addon-knobs @storybook/addon-links @types/storybook__addon-links
```

`.storybook/addon.js` を作成して以下を追加
```js
import '@storybook/addon-a11y/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-links/register';
```

`.storybook/config.js` に以下の設定を追加
```diff
  import { configure, addDecorator } from '@storybook/react';
+ import { withInfo } from '@storybook/addon-info';
+ import { withKnobs } from '@storybook/addon-knobs';
  
  ...
  
  function loadStories() {
+   addDecorator(withInfo);
+   addDecorator(withKnobs);
    req.keys().forEach(req); 
  }
```
