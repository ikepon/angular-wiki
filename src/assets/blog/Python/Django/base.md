# Django の基礎
## 基本コマンド
- 開発サーバーの起動
```
python manage.py runserver
```

- ポート番号の指定(デフォルトは 8000 )
```
python manage.py runserver 8080
```

- 新規アプリケーションの作成(この場合は polls を作成)
```
python manage.py startapp polls
```

## URL の指定方法
`urls.py` の path で指定する。  
path は route, view(必須)、kwargs, name(任意)のパラメータを持つ

### route
url の path を指定()
ex) `polls/`

### view
view を指定。
ex) `views.index`

### kwargs
任意のキーワード引数

### name
URL参照時の名前をつける。

## 開発の注意
- プロジェクトとapp
  - app は一つのアプリケーション
  - プロジェクトは複数の app を含んだもの
  - app は複数プロジェクトに入ることもできる
- ファイルの変更は基本的には検知して反映する
- ファイルの追加など、いくつかのものは検知しないので再起動が必要

## モデル変更の3ステップ
1. モデルを変更する(models.py)
2. マイグレーション作成( `python manage.py makemigrations` )
3. マイグレーション実行( `python manage.py migrate` )
