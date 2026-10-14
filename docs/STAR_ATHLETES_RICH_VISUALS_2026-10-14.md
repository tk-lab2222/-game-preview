# STAR ATHLETES v0.34.12 — 全体の素材感を磨く

ユーザー指定:「全体的にもう少しリッチな見た目にできる？」。

既存のcanonical skinを改訂。明るいパネルには乳白色のグラデーション・上端の光・控えめな段差と影。主ボタンには立体感、ロゴには金の星章。下のナビはネイビーのガラス風にし、選択中を金で示す。画面の背景色はラボの夜／育成の明るい空／大会の金／ネストの淡い紫。人物絵とキャラ名を主役に、キャラ画像の縁・能力パネル・星図・結果パネル・MY STAR等の素材を揃えた。文字・説明は追加しない。

育成する3体の選択欄には既存avatarによる小さなキャラ画像を追加。名前だけでなく見た目でも切り替えられる。画像専用の描画器は作らず、既存の描画と画像キャッシュを使う。育成状態・出生レア度・保存の計算は変更しない。

## 所有者と変更範囲

GAME CORE/theme:既存style-v094.cssを改訂、210の既存選択欄に画像を接続。SHARED ASSET:既存GamePreviewStandardの更新・エラー表示を継続使用。新runtime patch・別stylesheet・新規画像・新フォント・新しい保存キーは追加しない。以前の平坦なsurface/nav/selected-button表現は既存skin内で置換。4runtime files(210,skin,canonical entry,shell)のみ変更。v0.34.12/cache3412、113loaded JS。画像/フォントのライセンスと元データは維持。Added:このレポート、12実画面PNGと1JSON。Deleted/superseded:旧surfaceのstyle宣言。旧証跡は保持。

## 実画面と操作確認

同一セーブの旧v0.34.11と新v0.34.12を、390×844のスマホChromiumで比較。Labは配合前、育成／Nestは実3体を誕生・採用・再読込した同じセーブ、大会は実3回の練習後。4画面の通常表示で文字列は版番号を除き同じ(閉じたdetailsの中身は可視文字として数えない)。星図の開閉・表示・能力軸選択も確認。新3体サムネイルは実ピクセルを持ち、画像部分を押して各個体へ切り替えられた。

同じ初期個体・入力・固定乱数で3練習と大会を実行し、前版と現役個体/lastRound/coins/fame/turn、および大会後のstats/coins/fame/seasonHistoryが一致。再読込後の個体維持。320/390/414pxで4主要画面に横はみ出しなし、ナビ操作領域44px以上。エラー/欠落アセット0。release/save guards通過。単一の再現可能なプレイであり、全乱数・全シナリオ・全画面の同値証明ではない。キャラ・成長・遺伝の仕組みは変更せず、前版のより広い検証結果は過去証跡として保持。

証跡:quality-2026-10-14/rich-flow.json、rich-lab/training/nest/tournament/result/star-before/after.png。PNGは実ブラウザ画面。UI比較は一時的な検証スクリプトで行い、新たな恒久テストは追加していない。Chromiumのみで、実機Safari/低性能端末の描画速度・市場での評価は未確認。

既存draft PR19を更新し、公開mainは変更しない。Alpha Lab CURRENTとプレイZIPにソース・CI・証跡を揃える。
