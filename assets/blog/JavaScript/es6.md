# ES6
## import, export
通常の `export(defaultなし)` はその名前を指定して import する

```javascript
export class Character {
  // ...
}

import { Character } from '.../character';
``` 

## import as
`as` を使って別名をつけることもできる。

```javascript
import { User as Player } from './User';
```

## export default
好きな名前をつけて読み込める

```javascript
export default Anything;

import Anything from '...';
```
