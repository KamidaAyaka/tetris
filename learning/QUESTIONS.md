# テトリス学習 - 100問の穴埋め問題と解答

## Level 1: 基本的な定数と変数（問1-20）

### 問1: ボードの幅を定義
```javascript
const BOARD_WIDTH = /* ここに答えを書く */;
```
**解答**: `10`
**解説**: テトリスの標準的なボード幅は10マスです。

### 問2: ボードの高さを定義
```javascript
const BOARD_HEIGHT = /* ここに答えを書く */;
```
**解答**: `20`
**解説**: テトリスの標準的なボード高さは20マスです。

### 問3: 初期落下速度（ミリ秒）
```javascript
const INITIAL_SPEED = /* ここに答えを書く */;
```
**解答**: `1000`
**解説**: 1000ミリ秒（1秒）ごとにピースが1マス落ちます。

### 問4: Iテトロミノの色
```javascript
I: {
  shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  color: /* ここに答えを書く */
}
```
**解答**: `'#00f0f0'`（シアン色）
**解説**: Iピースは伝統的にシアン色です。

### 問5: Oテトロミノの形状（正方形）
```javascript
O: {
  shape: /* ここに答えを書く */,
  color: '#f0f000'
}
```
**解答**: `[[1, 1], [1, 1]]`
**解説**: Oピースは2×2の正方形です。

### 問6: 1ライン消去の得点
```javascript
const points = [0, /* 問6 */, 300, 500, 800][linesCleared] || 0;
```
**解答**: `100`
**解説**: 1ライン消去は100点です。

### 問7: 空のセルの初期値
```javascript
Array.from({ length: BOARD_WIDTH }, () => ({ filled: /* 問7 */, color: '' }))
```
**解答**: `false`
**解説**: 空のセルは`filled: false`です。

### 問8: テトロミノの種類の数
```javascript
// テトロミノは全部で何種類？
const TETROMINO_TYPES = /* 問8 */;
```
**解答**: `7`
**解説**: I, J, L, O, S, T, Zの7種類です。

### 問9: ランダムなインデックスの取得
```javascript
const randomKey = tetrominos[Math.floor(Math.random() * /* 問9 */)];
```
**解答**: `tetrominos.length`
**解説**: 配列の長さを使ってランダムなインデックスを生成します。

### 問10: セルのサイズ（ピクセル）
```javascript
const cellStyle = {
  width: /* 問10 */,
  height: '30px',
  // ...
};
```
**解答**: `'30px'`
**解説**: 各セルは30×30ピクセルです。

### 問11: Tテトロミノの色
```javascript
T: {
  shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  color: /* 問11 */
}
```
**解答**: `'#a000f0'`（紫色）
**解説**: Tピースは紫色です。

### 問12: Zテトロミノの形状
```javascript
Z: {
  shape: /* 問12 */,
  color: '#f00000'
}
```
**解答**: `[[1, 1, 0], [0, 1, 1], [0, 0, 0]]`
**解説**: Zピースはジグザグの形状です。

### 問13: 4ライン同時消去（テトリス）の得点
```javascript
const points = [0, 100, 300, 500, /* 問13 */][linesCleared] || 0;
```
**解答**: `800`
**解説**: 4ライン同時消去は800点です。

### 問14: グリッドのギャップサイズ
```javascript
const boardStyle = {
  display: 'grid',
  gap: /* 問14 */,
  // ...
};
```
**解答**: `'1px'`
**解説**: セル間の隙間は1ピクセルです。

### 問15: Sテトロミノの色
```javascript
S: {
  shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  color: /* 問15 */
}
```
**解答**: `'#00f000'`（緑色）
**解説**: Sピースは緑色です。

### 問16: ボーダーの角丸サイズ
```javascript
const cellStyle = {
  borderRadius: /* 問16 */,
  // ...
};
```
**解答**: `'2px'`
**解説**: セルの角を少し丸くします。

### 問17: Lテトロミノの形状
```javascript
L: {
  shape: /* 問17 */,
  color: '#f0a000'
}
```
**解答**: `[[0, 0, 1], [1, 1, 1], [0, 0, 0]]`
**解説**: Lピースは「L」の形をしています。

### 問18: 2ライン同時消去の得点
```javascript
const points = [0, 100, /* 問18 */, 500, 800][linesCleared] || 0;
```
**解答**: `300`
**解説**: 2ライン消去は300点です。

### 問19: Jテトロミノの色
```javascript
J: {
  shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  color: /* 問19 */
}
```
**解答**: `'#0000f0'`（青色）
**解説**: Jピースは青色です。

### 問20: グリッドの行数の指定
```javascript
const boardStyle = {
  gridTemplateRows: `repeat(${/* 問20 */}, 30px)`,
  // ...
};
```
**解答**: `board.length`
**解説**: ボードの行数分のグリッドを作成します。

## Level 2: テトロミノと配列操作（問21-40）

### 問21: 配列のマッピング - 行のコピー
```javascript
const newBoard = board.map(row => /* 問21 */);
```
**解答**: `[...row]`
**解説**: スプレッド構文で行を複製します。

### 問22: テトロミノのキーを取得
```javascript
const tetrominos = /* 問22 */(TETROMINOS);
```
**解答**: `Object.keys`
**解説**: オブジェクトのキーを配列として取得します。

### 問23: 配列の要素数を取得
```javascript
const N = matrix./* 問23 */;
```
**解答**: `length`
**解説**: 配列の長さを取得します。

### 問24: ネストされたマッピング
```javascript
const rotated = matrix.map((row, i) =>
  row.map((val, j) => matrix[N - 1 - /* 問24 */][i])
);
```
**解答**: `j`
**解説**: 列インデックスjを使って回転します。

### 問25: 配列の生成 - Array.from
```javascript
Array./* 問25 */({ length: BOARD_HEIGHT }, () => ...)
```
**解答**: `from`
**解説**: `Array.from()`で配列を生成します。

### 問26: 条件に基づくフィルタリング
```javascript
const isFull = row./* 問26 */(cell => cell.filled);
```
**解答**: `every`
**解説**: `every()`は全要素が条件を満たすかチェックします。

### 問27: 配列のフィルタリング
```javascript
const newBoard = gameBoard./* 問27 */(row => !isFull);
```
**解答**: `filter`
**解説**: 条件に合う要素だけを残します。

### 問28: 配列の先頭に追加
```javascript
newBoard./* 問28 */(Array.from({ length: BOARD_WIDTH }, () => ...));
```
**解答**: `unshift`
**解説**: 配列の先頭に要素を追加します。

### 問29: 床関数を使った計算
```javascript
const startX = Math./* 問29 */((BOARD_WIDTH - piece.shape[0].length) / 2);
```
**解答**: `floor`
**解説**: 小数点以下を切り捨てます。

### 問30: 最小値の取得
```javascript
const newSpeed = Math./* 問30 */(100, INITIAL_SPEED - ...);
```
**解答**: `max`
**解説**: 2つの値のうち大きい方を返します（スピードが速くなりすぎないように）。

### 問31: オブジェクトのスプレッド
```javascript
const rotated = { ...currentPiece, shape: /* 問31 */(currentPiece.shape) };
```
**解答**: `rotate`
**解説**: `rotate`関数でピースを回転します。

### 問32: 配列の長さチェック
```javascript
for (let y = 0; y < piece.shape./* 問32 */; y++) {
```
**解答**: `length`
**解説**: shape配列の行数を取得します。

### 問33: 2次元配列のアクセス
```javascript
for (let x = 0; x < piece.shape[y]./* 問33 */; x++) {
```
**解答**: `length`
**解説**: その行の列数を取得します。

### 問34: 配列の要素チェック
```javascript
if (piece.shape[/* 問34 */][x]) {
```
**解答**: `y`
**解説**: y行x列の要素にアクセスします。

### 問35: オブジェクトのコピー
```javascript
const displayBoard = board.map(row => row.map(cell => ({ .../* 問35 */ })));
```
**解答**: `cell`
**解説**: 各セルをスプレッド構文でコピーします。

### 問36: 配列の検索 - findIndex
```javascript
const rank = sortedScores./* 問36 */(s => s.id === newScore.id) + 1;
```
**解答**: `findIndex`
**解説**: 条件に合う要素のインデックスを返します。

### 問37: 配列のソート
```javascript
const topScores = data.scores./* 問37 */((a, b) => b.score - a.score);
```
**解答**: `sort`
**解説**: 配列をソートします。

### 問38: 配列のスライス
```javascript
const topScores = data.scores.sort(...)./* 問38 */(0, 10);
```
**解答**: `slice`
**解説**: 配列の一部を取り出します。

### 問39: 配列への追加
```javascript
data.scores./* 問39 */(newScore);
```
**解答**: `push`
**解説**: 配列の末尾に要素を追加します。

### 問40: テトロミノのランダム選択
```javascript
const piece = nextPiece || /* 問40 */();
```
**解答**: `randomTetromino`
**解説**: ランダムなテトロミノを生成する関数を呼び出します。

## Level 3: 衝突検出とボード操作（問41-60）

### 問41: 境界チェック - 左端
```javascript
if (newX < /* 問41 */ || newX >= BOARD_WIDTH || ...) {
  return true;
}
```
**解答**: `0`
**解説**: x座標が0未満なら左端を超えています。

### 問42: 境界チェック - 下端
```javascript
if (... || newY >= /* 問42 */) {
  return true;
}
```
**解答**: `BOARD_HEIGHT`
**解説**: y座標がボード高さ以上なら下端を超えています。

### 問43: セルが埋まっているかチェック
```javascript
if (newY >= 0 && gameBoard[newY][newX]./* 問43 */) {
  return true;
}
```
**解答**: `filled`
**解説**: セルのfilled属性をチェックします。

### 問44: 座標の計算 - Y軸
```javascript
const boardY = position./* 問44 */ + y;
```
**解答**: `y`
**解説**: 現在位置にオフセットを加えます。

### 問45: 座標の計算 - X軸
```javascript
const boardX = position.x + /* 問45 */;
```
**解答**: `x`
**解説**: 現在位置にオフセットを加えます。

### 問46: 範囲チェック - Y軸
```javascript
if (boardY >= /* 問46 */ && boardY < BOARD_HEIGHT) {
```
**解答**: `0`
**解説**: y座標が0以上かチェックします。

### 問47: ボードへの書き込み
```javascript
newBoard[boardY][boardX] = {
  filled: /* 問47 */,
  color: currentPiece.color
};
```
**解答**: `true`
**解説**: セルを埋めるのでtrueを設定します。

### 問48: 新しい位置の計算
```javascript
const newPos = { x: position.x + /* 問48 */, y: position.y + dy };
```
**解答**: `dx`
**解説**: x方向の移動量を加えます。

### 問49: 衝突チェックの呼び出し
```javascript
if (!/* 問49 */(currentPiece, newPos, board)) {
```
**解答**: `checkCollision`
**解説**: 衝突検出関数を呼び出します。

### 問50: 位置の更新
```javascript
/* 問50 */(newPos);
```
**解答**: `setPosition`
**解説**: Reactの状態更新関数を呼び出します。

### 問51: 下方向の移動チェック
```javascript
if (dy > /* 問51 */) {
```
**解答**: `0`
**解説**: dyが正なら下方向への移動です。

### 問52: ボードの更新
```javascript
const newBoard = /* 問52 */();
```
**解答**: `mergePieceToBoard`
**解説**: ピースをボードに固定する関数を呼び出します。

### 問53: ライン消去の実行
```javascript
const clearedBoard = /* 問53 */(newBoard);
```
**解答**: `clearLines`
**解説**: 揃ったラインを消去する関数を呼び出します。

### 問54: ボード状態の設定
```javascript
/* 問54 */(clearedBoard);
```
**解答**: `setBoard`
**解説**: ボードの状態を更新します。

### 問55: 新しいピースの生成
```javascript
/* 問55 */();
```
**解答**: `spawnNewPiece`
**解説**: 新しいピースを生成する関数を呼び出します。

### 問56: ゲームオーバーの設定
```javascript
/* 問56 */(true);
return false;
```
**解答**: `setGameOver`
**解説**: ゲームオーバー状態をtrueに設定します。

### 問57: ピースの設定
```javascript
/* 問57 */(piece);
```
**解答**: `setCurrentPiece`
**解説**: 現在のピースを設定します。

### 問58: 次のピースの設定
```javascript
/* 問58 */(randomTetromino());
```
**解答**: `setNextPiece`
**解説**: 次のピースを設定します。

### 問59: スコアの加算
```javascript
setScore(prev => prev + /* 問59 */);
```
**解答**: `points`
**解説**: 獲得した点数を加算します。

### 問60: ラインカウントの更新
```javascript
setLines(prev => prev + /* 問60 */);
```
**解答**: `linesCleared`
**解説**: 消去したライン数を加算します。

## Level 4: ゲームロジックと状態管理（問61-80）

### 問61: useStateフック - ボード
```javascript
const [board, setBoard] = /* 問61 */(createEmptyBoard());
```
**解答**: `useState`
**解説**: Reactの状態管理フックです。

### 問62: useStateフック - スコア
```javascript
const [score, setScore] = useState(/* 問62 */);
```
**解答**: `0`
**解説**: スコアの初期値は0です。

### 問63: useCallbackフック
```javascript
const movePiece = /* 問63 */((dx, dy) => {
  // ...
}, [依存配列]);
```
**解答**: `useCallback`
**解説**: 関数をメモ化します。

### 問64: 条件による早期リターン
```javascript
if (!currentPiece || /* 問64 */ || isPaused) return false;
```
**解答**: `gameOver`
**解説**: ゲームオーバー時は処理を中断します。

### 問65: useEffectフック
```javascript
/* 問65 */(() => {
  // 副作用の処理
}, [依存配列]);
```
**解答**: `useEffect`
**解説**: 副作用を扱うフックです。

### 問66: インターバルの設定
```javascript
const interval = /* 問66 */(() => {
  movePiece(0, 1);
}, speed);
```
**解答**: `setInterval`
**解説**: 一定間隔で関数を実行します。

### 問67: クリーンアップ関数
```javascript
return () => /* 問67 */(interval);
```
**解答**: `clearInterval`
**解説**: インターバルをクリアします。

### 問68: イベントリスナーの追加
```javascript
window./* 問68 */('keydown', handleKeyPress);
```
**解答**: `addEventListener`
**解説**: キーボードイベントを監視します。

### 問69: イベントリスナーの削除
```javascript
return () => window./* 問69 */('keydown', handleKeyPress);
```
**解答**: `removeEventListener`
**解説**: イベントリスナーを削除します。

### 問70: デフォルト動作の防止
```javascript
e./* 問70 */();
```
**解答**: `preventDefault`
**解説**: ブラウザのデフォルト動作を防ぎます。

### 問71: キーの判定 - 左矢印
```javascript
case '/* 問71 */':
  movePiece(-1, 0);
  break;
```
**解答**: `ArrowLeft`
**解説**: 左矢印キーのキー名です。

### 問72: キーの判定 - 上矢印
```javascript
case 'ArrowUp':
  /* 問72 */();
  break;
```
**解答**: `rotatePiece`
**解説**: 上矢印でピースを回転します。

### 問73: キーの判定 - スペース
```javascript
case '/* 問73 */':
  hardDrop();
  break;
```
**解答**: ` `（スペース）
**解説**: スペースキーのキー名です。

### 問74: 状態の反転
```javascript
setIsPaused(prev => !/* 問74 */);
```
**解答**: `prev`
**解説**: 前の状態を反転します。

### 問75: 条件付きレンダリング
```javascript
{gameOver && (
  <div>/* 問75 */</div>
)}
```
**解答**: `ゲームオーバー`（または任意のテキスト）
**解説**: 条件が真の時だけレンダリングします。

### 問76: propsの受け取り
```javascript
const GameInfo = ({ score, lines, /* 問76 */ }) => {
```
**解答**: `gameOver`（または他のprops）
**解説**: コンポーネントのpropsを分割代入で受け取ります。

### 問77: クリックハンドラー
```javascript
<button /* 問77 */={gameOver ? onStart : onPause}>
```
**解答**: `onClick`
**解説**: クリックイベントハンドラーです。

### 問78: 三項演算子
```javascript
{gameOver /* 問78 */ '新しいゲーム' : '一時停止'}
```
**解答**: `?`
**解説**: 条件 ? 真の値 : 偽の値

### 問79: 配列のマッピング - JSX
```javascript
{board.map((row, y) =>
  row.map((cell, x) => (
    <Cell /* 問79 */={`${y}-${x}`} />
  ))
)}
```
**解答**: `key`
**解説**: Reactのリストには一意なkeyが必要です。

### 問80: コンポーネントのインポート
```javascript
/* 問80 */ React from 'react';
```
**解答**: `import`
**解説**: モジュールをインポートします。

## Level 5: 高度な機能とReact Hooks（問81-100）

### 問81: ハードドロップのロジック
```javascript
let newY = position.y;
while (!checkCollision(currentPiece, { x: position.x, y: newY + /* 問81 */ }, board)) {
  newY++;
}
```
**解答**: `1`
**解説**: 1マスずつ下に移動できるかチェックします。

### 問82: setTimeoutの使用
```javascript
/* 問82 */(() => {
  // 遅延実行
}, 0);
```
**解答**: `setTimeout`
**解説**: 非同期で関数を実行します。

### 問83: 壁蹴りの試行
```javascript
for (const kick of /* 問83 */) {
```
**解答**: `kicks`
**解説**: 壁蹴りパターンの配列をループします。

### 問84: オブジェクトのプロパティアクセス
```javascript
const newPos = { x: position.x + kick./* 問84 */, y: position.y + kick.y };
```
**解答**: `x`
**解説**: kickオブジェクトのxプロパティにアクセスします。

### 問85: 早期リターン
```javascript
if (!checkCollision(rotated, newPos, board)) {
  setCurrentPiece(rotated);
  setPosition(newPos);
  /* 問85 */;
}
```
**解答**: `return`
**解説**: 成功したら関数を終了します。

### 問86: スピードの計算
```javascript
const newSpeed = Math.max(100, INITIAL_SPEED - Math./* 問86 */(newTotalLines / 10) * 100);
```
**解答**: `floor`
**解説**: 小数点以下を切り捨てます。

### 問87: スピードの設定
```javascript
/* 問87 */(newSpeed);
```
**解答**: `setSpeed`
**解説**: ゲームスピードを更新します。

### 問88: 条件による実行
```javascript
if (linesCleared > /* 問88 */) {
```
**解答**: `0`
**解説**: ラインが消去された場合のみ処理します。

### 問89: 配列の長さチェック
```javascript
while (newBoard./* 問89 */ < BOARD_HEIGHT) {
```
**解答**: `length`
**解説**: ボードの行数をチェックします。

### 問90: ボードのリセット
```javascript
setBoard(/* 問90 */());
```
**解答**: `createEmptyBoard`
**解説**: 空のボードを作成する関数を呼び出します。

### 問91: Expressのインポート
```javascript
import express from '/* 問91 */';
```
**解答**: `express`
**解説**: Expressフレームワークをインポートします。

### 問92: ミドルウェアの使用
```javascript
app./* 問92 */(cors());
```
**解答**: `use`
**解説**: ミドルウェアを適用します。

### 問93: GETルートの定義
```javascript
app./* 問93 */('/api/scores', async (req, res) => {
```
**解答**: `get`
**解説**: GETリクエストのルートを定義します。

### 問94: POSTルートの定義
```javascript
app./* 問94 */('/api/scores', async (req, res) => {
```
**解答**: `post`
**解説**: POSTリクエストのルートを定義します。

### 問95: リクエストボディの取得
```javascript
const { playerName, score, lines } = req./* 問95 */;
```
**解答**: `body`
**解説**: リクエストのボディデータにアクセスします。

### 問96: レスポンスの送信
```javascript
res./* 問96 */({ scores: topScores });
```
**解答**: `json`
**解説**: JSON形式でレスポンスを送信します。

### 問97: ステータスコードの設定
```javascript
res./* 問97 */(201).json({...});
```
**解答**: `status`
**解説**: HTTPステータスコードを設定します。

### 問98: サーバーの起動
```javascript
app./* 問98 */(PORT, () => {
  console.log(`サーバー起動: ${PORT}`);
});
```
**解答**: `listen`
**解説**: サーバーを指定ポートで起動します。

### 問99: エラーハンドリング
```javascript
/* 問99 */ (error) {
  console.error('エラー:', error);
}
```
**解答**: `catch`
**解説**: try-catchのcatchブロックです。

### 問100: 非同期関数の定義
```javascript
const startServer = /* 問100 */ () => {
  await initScoresFile();
  app.listen(PORT);
};
```
**解答**: `async`
**解説**: 非同期関数を定義します。

---

## 🎉 完了おめでとうございます！

全100問を解いたあなたは、以下のスキルを習得しました：

- ✅ JavaScriptの基本構文
- ✅ 配列とオブジェクトの操作
- ✅ React Hooksの使い方
- ✅ ゲームロジックの実装
- ✅ 状態管理
- ✅ イベント処理
- ✅ Node.js/Expressの基礎

次のステップ：
1. 自分でテトリスをカスタマイズしてみよう
2. 他のゲームを作ってみよう
3. より高度な機能を追加してみよう（マルチプレイヤー、アニメーションなど）
