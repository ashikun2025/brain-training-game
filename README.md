# 脳トレ計算ゲーム

記憶力や集中力、暗算力を鍛えるためのブラウザ向けの計算ゲームです。

---

## ゲーム概要
画面上から落下してくる計算カードをクリックし、
正しい答えを入力するとスコアを獲得できます。
連続正解するとコンボが発生し、スコアが加算されます。

連続で正解し、高スコアを目指しましょう!

---

## 公開URL
https://ashikun2025.github.io/brain-training-game_ver2/

---

## 使用技術
- HTML
- CSS
- JavaScript
- anime.js (アニメーション)
- lodash (乱数処理)

---

## 機能一覧
- 計算カードのランダム生成
- カード落下アニメーション
- 制限時間タイマー
- コンボボーナス機能
- スコア・結果画面表示
- 難易度選択(初級・中級・上級)を追加

---

## テスト
- 単体テスト
- 結合テスト
- ストレステスト
- 受入テスト

---

## 工夫
- コンボが続くほどスコアが増加する設計
- 正解・不正解をアニメーションで視覚的に表現
- ストレステストを実施し、カクつきがないことを確認
- 上級用の計算式を解くために、優先順位を考慮

---

## ディレクトリ構成
├── index.html
├── howto-play.html
├── select-difficult.html
├── game.html
├── result.html
├── css/
│ └── start.css
│ └── howto-play.css
│ └── select-difficult.css
│ └── game.css
│ └── result.css
└── js/
  └── start.js
  └── howto-play.js
  └── select-difficult.js
  └── game.js
  └── result.js

---

## 注意事項
- PCブラウザ(chrome推奨)でのプレイを想定しています
- スマートフォン表示には最適化していません