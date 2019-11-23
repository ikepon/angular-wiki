# Terraform の基本コマンド
## terraform init
Terraform の作業ディレクトリの初期化。このコマンドによって `terraform plan` といった他のコマンドが使えるようになる。

先に tf ファイルを作成しておくと、その中身を見て必要なプラグインなどをDLして plan を実行できるようにしてくれる

## terraform plan
作業ディレクトリ内の `.tf` ファイルを適用したときの差分を表示する。 `.tf` ファイルの整合性を確認できるが、必ずしも適用可能というわけではないので注意が必要。

## terraform apply
`.tf` ファイルを元にインフラを構築することができる。

実行すると `terraform.tfstate` というファイルが作成される。実行された結果(作成されてリソース)情報が記載されている。このファイルは remote_state で使用される


# tf ファイルコード
## クラウドサービスの指定やリージョン、アクセスキー、シークレットキーを指定できる
```tf
provider "aws" {
  region = "ap-northeast-1"
}
```

## リソースの作成
```tf
resource 作成するリソース名 作成するリソースの識別名 {
  各種設定
}
```

ex) ec2インスタンスを作成。subnet は同ファイル、または同ディレクトリ内で作成した subnet:public_subnet と紐づけしている
```tf
resource "aws_instance" "sandbox" {
  ami = "ami-785c491f"
  instance_type = "t2.micro"
  subnet_id = "${aws_subnet.public_subnet.id}"
}

```

※ 別のディレクトリのリソースを参照したい場合は `remote_state` を使う
その際、 `terraform apply` の実行後に作成される terraform.tfstate というファイルを remote_state で指定する

# 別リソース参照用のデータを作成
```tf
output "public_subnet_id" {
  value = "${aws_subnet.public_subnet.id}"
}
```

tfstate に output の項目を追加し、外部からの参照ができるようにする
