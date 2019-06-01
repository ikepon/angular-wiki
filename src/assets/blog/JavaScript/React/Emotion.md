# [Emotion](https://www.npmjs.com/package/emotion)
React で使う場合、Emotion のコンパイラを通す必要がある

`/* @jsx jsx */` の JSX Pragma というマジックワードが必要。

```typescript jsx
/* @jsx jsx */
import React, { FC } from 'react';
import { css, jsx } from '@emotion/core';
```

- 親コンポーネントで JSX Pragma を使ったら、子コンポーネントでも JSX Pragma を使う必要がある
- JSX Pragma を使用して記述したコンポーネントはフラグメントの使用ができない(`<>~</>`)
- ESLint の問題で、JSX Pragma を使うと、 `React` ( `import React from 'react'` でインポートしてる)使ってないよって怒られる
-> `.eslintrc` に以下の設定を追加することで回避する
```
'@typescript-eslint/no-unused-vars': [
  'error',
  {
    varsIgnorePattern: '[Rr]eact'
  }
],
```
