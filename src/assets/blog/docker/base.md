# Docker の基本
## 基本コマンド
```
# docker のリポジトリを探す
docker search リポジトリ名

# docker のリポジトリ取得
docker pull リポジトリ名(xxxx/xxxx)

# docker のリポジトリのすべてのバージョンを取得
docker pull -a リポジトリ名

# 取得した docker image の確認
docker images

# コンテナを起動
docker run -it --name コンテナの別名 使用するコンテナイメージ名 コンテナ内の実行コマンド

# ex) docker run -it -p 8000:80 --name web01 ikepon/httpd:ver1.0 /bin/bash
# options
# -i: 標準入出力に接続して対話的に操作
# -t: TTY端末を割り当てて bash のようなコマンドライン操作を行うプロセスを使用する
# --name コンテナの別名: 指定しないと適当な名前が割り振られる
# -p 8000:80 : ポートフォワーディング

# 上記コマンドで入った時に docker を起動したまま抜ける
ctrl + PQ

# 稼働中のコンテナ一覧
docker ps

# -a: 停止中も含めてコンテナ一覧を表示する

# 一度抜けた docker コンテナに再度接続する
docker attatch コンテナ名

# 起動しているコンテナを止める
docker stop コンテナ名

# コンテナを起動する
docker start コンテナ名

# 現状のコンテナを保存
docker commit コンテナ名 ユーザー名/イメージID

# コンテナを削除
docker rm コンテナ名

# コンテナの変更ファイルを表示
docker diff コンテナ名

# ex) docker diff web01
# C /var
# C /var/run
# C /var/run/httpd
# A /var/run/httpd/httpd.pid
# C /var/www
# C /var/www/html
# A /var/www/html/index.html
# C /var/lock
# C /var/lock/subsys
# A /var/lock/subsys/httpd
# C /var/log
# C /var/log/httpd
# A /var/log/httpd/error_log
# A /var/log/httpd/access_log

# A: 追加されたもの
# C: 変更のあったもの

# コンテナ内のファイルをホスト側にコピー
docker cp コンテナ名:ファイル場所 ホスト保存場所
# ex) docker cp web01:/var/log/httpd /tmp

# docker hub login
docker login
```
