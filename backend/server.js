import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const SCORES_FILE = path.join(__dirname, 'scores.json');

// ミドルウェア
app.use(cors());
app.use(express.json());

// スコアファイルの初期化
const initScoresFile = async () => {
  try {
    await fs.access(SCORES_FILE);
  } catch {
    await fs.writeFile(SCORES_FILE, JSON.stringify({ scores: [] }));
  }
};

// スコアを読み込む
const readScores = async () => {
  try {
    const data = await fs.readFile(SCORES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('スコア読み込みエラー:', error);
    return { scores: [] };
  }
};

// スコアを保存する
const writeScores = async (data) => {
  try {
    await fs.writeFile(SCORES_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('スコア保存エラー:', error);
  }
};

// ルート
app.get('/', (req, res) => {
  res.json({ message: 'テトリスバックエンドAPIが稼働中です！' });
});

// ハイスコアを取得
app.get('/api/scores', async (req, res) => {
  try {
    const data = await readScores();
    const topScores = data.scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    res.json({ scores: topScores });
  } catch (error) {
    res.status(500).json({ error: 'スコアの取得に失敗しました' });
  }
});

// 新しいスコアを追加
app.post('/api/scores', async (req, res) => {
  try {
    const { playerName, score, lines } = req.body;

    if (!playerName || score === undefined || lines === undefined) {
      return res.status(400).json({ error: '必須項目が不足しています' });
    }

    const data = await readScores();
    const newScore = {
      id: Date.now(),
      playerName,
      score,
      lines,
      date: new Date().toISOString()
    };

    data.scores.push(newScore);
    await writeScores(data);

    // ランキングでの順位を計算
    const sortedScores = data.scores.sort((a, b) => b.score - a.score);
    const rank = sortedScores.findIndex(s => s.id === newScore.id) + 1;

    res.status(201).json({
      message: 'スコアが保存されました',
      score: newScore,
      rank,
      isTopTen: rank <= 10
    });
  } catch (error) {
    console.error('スコア保存エラー:', error);
    res.status(500).json({ error: 'スコアの保存に失敗しました' });
  }
});

// スコアをリセット（開発用）
app.delete('/api/scores', async (req, res) => {
  try {
    await writeScores({ scores: [] });
    res.json({ message: 'すべてのスコアがリセットされました' });
  } catch (error) {
    res.status(500).json({ error: 'スコアのリセットに失敗しました' });
  }
});

// サーバー起動
const startServer = async () => {
  await initScoresFile();
  app.listen(PORT, () => {
    console.log(`✅ サーバーが起動しました: http://localhost:${PORT}`);
    console.log(`📊 スコアファイル: ${SCORES_FILE}`);
  });
};

startServer();
