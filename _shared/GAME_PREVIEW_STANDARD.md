# Game Preview Standard v1

スマホ向けゲームの公開版に最初から適用する最低要件。

## UI
- 画面内にゲーム名とバージョンを常時表示
- 「↻ 最新版」ボタンを常設
- スマホ縦画面・タッチ操作を優先
- 固定URLを維持する

## Runtime
- strict mode を使用
- window error / unhandledrejection を捕捉し、画面上にもエラーを表示
- 更新ボタンは cache-busting query を付けて再読込
- localStorage を使う場合はゲーム固有prefixを使用
- 全データ初期化導線を用意する場合、確認後にゲーム固有データだけ削除

## Release gate
1. バージョン更新
2. 構文・未宣言変数などの静的確認
3. 起動→主要操作→結果画面まで確認
4. GitHub main の対象ファイルを再取得してversion確認
5. GitHub Pages deployment が success になったことを確認
6. cache-busting URLで公開版確認
7. 最後にiPhone実機確認を依頼

GitHubへのcommit成功だけでは公開完了扱いにしない。
