# テトリス学習 - ヒント集

このファイルには、各レベルでよくある質問とヒントをまとめています。
完全に詰まったときだけ見るようにしましょう！

## Level 1のヒント: 基本的な定数と変数

### 定数の定義について
- `const` は変更されない値を定義します
- テトリスの標準的なボードサイズは 10×20 です
- 色コードは6桁の16進数で表現します（例: `#ff0000` = 赤）

### よくある質問
**Q: テトロミノの色はどう決めればいい？**
A: 一般的なテトリスの色を参考にしてください：
- I（棒）: シアン `#00f0f0`
- O（四角）: 黄色 `#f0f000`
- T（T字）: 紫 `#a000f0`
- S（S字）: 緑 `#00f000`
- Z（Z字）: 赤 `#f00000`
- J（逆L）: 青 `#0000f0`
- L（L字）: オレンジ `#f0a000`

**Q: スコアはどう計算する？**
A: 一般的なルール：
- 1ライン: 100点
- 2ライン: 300点
- 3ライン: 500点
- 4ライン（テトリス）: 800点

## Level 2のヒント: テトロミノと配列操作

### 配列のメソッド
- `map()`: 配列の各要素を変換して新しい配列を作成
- `filter()`: 条件に合う要素だけを残す
- `every()`: 全ての要素が条件を満たすかチェック
- `push()`: 配列の末尾に追加
- `unshift()`: 配列の先頭に追加
- `slice()`: 配列の一部を取り出す（元の配列は変更しない）

### スプレッド構文
```javascript
// 配列のコピー
const newArray = [...oldArray];

// オブジェクトのコピー
const newObj = { ...oldObj };

// プロパティの上書き
const updated = { ...obj, name: '新しい名前' };
```

### よくある質問
**Q: `map()` と `forEach()` の違いは？**
A: `map()` は新しい配列を返しますが、`forEach()` は返り値がありません。

**Q: 2次元配列のループはどう書く？**
A: ネストしたforループを使います：
```javascript
for (let y = 0; y < array.length; y++) {
  for (let x = 0; x < array[y].length; x++) {
    // array[y][x] にアクセス
  }
}
```

## Level 3のヒント: 衝突検出とボード操作

### 衝突検出の考え方
1. ピースの各ブロックについて：
   - ボードの境界を超えているか？
   - すでに埋まっているマスと重なっているか？
2. 1つでも衝突があれば `true` を返す

### 座標系の理解
```
(0,0) → X軸
  ↓
  Y軸

- X座標: 0 ～ BOARD_WIDTH-1
- Y座標: 0 ～ BOARD_HEIGHT-1
```

### よくある質問
**Q: なぜ `newY >= 0` をチェックする？**
A: ピースがボードの上部（画面外）にあるときは、まだ衝突判定をしません。

**Q: ピースをボードに固定するタイミングは？**
A: 下に移動しようとして衝突が検出されたときです。

## Level 4のヒント: ゲームロジックと状態管理

### React Hooksの基本

#### useState
```javascript
const [state, setState] = useState(initialValue);

// 値を直接設定
setState(newValue);

// 前の値を使って更新
setState(prev => prev + 1);
```

#### useEffect
```javascript
useEffect(() => {
  // 副作用の処理（API呼び出し、タイマーなど）
  
  return () => {
    // クリーンアップ（タイマーの解除など）
  };
}, [依存する変数]);
```

#### useCallback
```javascript
const memoizedFunction = useCallback(() => {
  // 処理
}, [依存する変数]);
```

### イベント処理
```javascript
// イベントリスナーの追加
window.addEventListener('keydown', handler);

// イベントリスナーの削除（クリーンアップ）
window.removeEventListener('keydown', handler);

// デフォルト動作の防止（ページスクロールなど）
event.preventDefault();
```

### よくある質問
**Q: useEffectの依存配列とは？**
A: 配列に指定した変数が変更されたときだけ、副作用が再実行されます。

**Q: なぜクリーンアップが必要？**
A: タイマーやイベントリスナーを放置すると、メモリリークの原因になります。

**Q: useCallbackはいつ使う？**
A: 関数を子コンポーネントに渡すときや、useEffectの依存配列に含めるときです。

## Level 5のヒント: 高度な機能とReact Hooks

### ハードドロップの実装
1. 現在位置から下に移動できるところまで移動
2. whileループで衝突するまで y座標を増やす
3. その位置にピースを配置

### 壁蹴り（Wall Kick）
回転時に壁や他のブロックに当たった場合、少しずらして回転を試みます：
```javascript
const kicks = [
  { x: -1, y: 0 },  // 左に1マス
  { x: 1, y: 0 },   // 右に1マス
  { x: 0, y: -1 }   // 上に1マス
];
```

### 非同期処理
```javascript
// async/await
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Promise
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### よくある質問
**Q: setTimeoutとsetIntervalの違いは？**
A: 
- `setTimeout`: 一度だけ実行
- `setInterval`: 繰り返し実行

**Q: async/awaitとは？**
A: 非同期処理を同期処理のように書ける構文です。`await`は`async`関数の中でのみ使えます。

**Q: Expressのミドルウェアとは？**
A: リクエストとレスポンスの間で実行される処理です（認証、ログ、CORSなど）。

## デバッグのヒント

### よくあるエラーと対処法

**エラー: "Cannot read property 'length' of undefined"**
→ 配列やオブジェクトが存在しないか、nullです。条件分岐で確認しましょう。

**エラー: "Maximum update depth exceeded"**
→ useEffectの依存配列が不適切で、無限ループが発生しています。

**エラー: "Each child in a list should have a unique 'key' prop"**
→ `map()`でレンダリングする要素には、一意な`key`プロパティが必要です。

### デバッグテクニック

1. **console.log()を活用**
```javascript
console.log('変数の値:', variable);
console.log('関数が呼ばれました');
```

2. **ブラウザの開発者ツール**
- F12キーで開く
- Consoleタブでエラーを確認
- Elementsタブで要素を検査

3. **段階的に実装**
- 一度に全てを実装せず、少しずつテストしながら進める

4. **コードを読み直す**
- 変数名や関数名は正しいか？
- 括弧やカンマは抜けていないか？
- インデントは正しいか？

## 学習のコツ

### 1. 理解してから書く
コードをコピーするのではなく、「なぜこうするのか」を理解しましょう。

### 2. 小さく始める
全体を一度に作ろうとせず、機能ごとに分けて実装しましょう。

### 3. エラーを恐れない
エラーは学習の機会です。エラーメッセージをよく読んで、原因を探りましょう。

### 4. 実験する
答えを見る前に、いろいろ試してみましょう。失敗から学ぶことは多いです。

### 5. 休憩を取る
詰まったら一度離れて、リフレッシュしてから戻りましょう。

## 参考リソース

### JavaScript
- [MDN JavaScript ガイド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://ja.javascript.info/)

### React
- [React 公式ドキュメント](https://ja.react.dev/)
- [React Hooks 入門](https://ja.react.dev/reference/react)

### 配列メソッド
- [Array.prototype.map()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.filter()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

### Node.js/Express
- [Express 公式ドキュメント](https://expressjs.com/ja/)
- [Node.js 公式ドキュメント](https://nodejs.org/ja/docs/)

---

頑張ってください！わからないことがあれば、公式ドキュメントを読むか、エラーメッセージで検索してみましょう。
