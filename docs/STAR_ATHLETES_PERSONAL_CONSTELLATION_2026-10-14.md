# STAR ATHLETES v0.34.11 — 育てた星

ユーザーの「開発続けて。オリジナリティを出していきたい」を、星の世界観と育成判断を結ぶ表示に反映した。

## 実装した遊びの手触り

自分が練習・実戦で伸ばした6能力を、個体ごとの星図として見られる。速度・力・技巧の練習で違う方向が輝く。「育成」は記録済みの練習＋実戦の増分、「いま」は現在の能力。軸をタップすると能力名と正確な値、練習／実戦の内訳が出る。通常は小さな星図と合計を表示し、タップして詳細を開く。長い説明や新しい必須操作を増やさない。

育成とネストのチーム／血統／MY STARが同じ表示を使う。MY STARは保存した個体の記録を読むため、その後に現役が育っても保存時の星を保つ。これは6能力の成長記録の可視化であり、新しい才能・ボーナス・遺伝ルールではない。楽しさ・独自性・売上の市場検証はまだ。

## 既存の所有者と置き換え

- GAME CORE226:既存trainingGain226/matchGain226とstatsを読み取る純粋なstarValues、DOM表示starMap。描画・閲覧でmeta226・保存・乱数を呼ばない。過去の数値を推測して出生能力や育成履歴を作らない。イベントやLIMITが既存journalへ書いた増分も同じ表示に反映する。軸の長さは表示モード内で正規化し、画面の数値は実際の記録値。
- GAME CORE210/201:育成とネストにネイティブdetailsを接続。表示モード・選択軸・開閉はUIのメモリだけ。210は現役入れ替え時に古い表示状態を除去。201は選んだ保存スナップショットを直接渡す。同じIDの現役を参照して置き換えない。
- RETIRE:226の旧デバッグ用growth226バッジ、専用renderラッパー、バッジCSSを削除。新しいruntime patchは追加せず113loaded JSのまま。
- SHARED ASSET:既存GamePreviewStandardの更新・エラー表示を継続使用。canonical entry/shell/skinをv0.34.11/cache3411。新しい共通ライブラリや保存キーは作らない。

Modified:226/210/201、canonical entry/shell、既存skin。Added:実フロー確認script、レポート、実画面PNG/JSON。Deleted/superseded:旧デバッグバッジとrenderラッパー。過去の証跡は維持。

## 実操作での検証

scripts/verify_star_athletes_constellation.pyで3体を実際に誕生・採用。速度／力／技巧を選び3回練習して3つの異なる星図を確認。能力・ターン・勝利の書き換えを使わない。全6軸×2表示をクリックし、実際のjournal/statsとの一致と閲覧前後のSの不変を確認。再読み込みで記録保持。1回目にMY STARと保護保存を作り、その後の3回目の現役と独立した保存時の星を確認。実際の確認ダイアログで保護データへ戻し、星図と個体記録の復元を確認。

同じ初期セーブ、入力、固定乱数でv0.34.10の前ソースと比較し、現役個体全データ・coins/fame/turn/lastRoundが一致した。3体・3練習の再現可能な一例であり、全乱数／全戦略の同値証明ではない。旧個体のjournal欠落は別の明示的fixtureで検証し、+0表示・描画による書き換えなしを確認。履歴の無い個体の過去成長は復元しない。

320/390/414pxで横はみ出しなし、詳細の軸／表示ボタンは44px以上。runtime errors/missing assets0。Chromiumのみ。release/save/upper-rarity guards通過。9練習の外見成長や全体バランス等の旧証跡は前版の証跡として保持し、今回全ゲーム攻略を再検証したとは扱わない。

証跡:quality-2026-10-14/constellation-flow.json、constellation-star-main.png、constellation-star-speed/power/tech.png、constellation-star-my-star.png、constellation-star-nest.png、constellation-star-width-320/390/414.png等。PNGは実ブラウザ画面で、別の見本画像ではない。

既存Draft PR19への更新。公開mainは変更しない。Alpha Lab CURRENTに正確なソース／CI／配布物を記録する。追加5種の元案回収、オンライン対戦、実機Safariは今回の実装完了に含めない。
