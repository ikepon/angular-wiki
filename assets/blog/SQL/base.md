# SQL の基本
## カラムの抽出 `SELECT`
```sql
SELECT
  ProductName AS 商品名
, Price AS 価格
FROM
  Products
;
```

## カラムの計算
```sql
SELECT
  ProductName AS 商品名
, Price * 1.08 AS 税込み価格
FROM
  Products
;
```

## テキストの連結
```sql
SELECT
  CustomerName || '様' AS 顧客名
FROM
  Customers
;
```

## 並び替え
```sql
SELECT
  CustomerName || '様' AS 顧客名
FROM
  Customers
ORDER BY
  CustomerName DESC
;
```

並び替えのデフォルトは `ASC` (昇順)。
降順( `DESC` )にしたいならカラム名のあとに追加すればいい

## 集合関数
```sql
SELECT
  AVG(Price) AS 平均価格
FROM
  Products
;
```

その他、以下のようなものがある
- 個数（COUNT）
- 平均（AVG）
- 総和（SUM）
- 最大（MAX）
- 最小（MIN）

## 条件で絞り込み `WHERE`
```sql
SELECT
  ProductName AS 商品名
, Price AS 価格
FROM
  Products
WHERE
  Price >= 1000
;

SELECT
  ProductName AS 商品名
, Price AS 価格
FROM
  Products
WHERE
  ProductName LIKE '%機'
;
```

`WHERE` は1行ごとに条件を確認しているので FROM のあとに来てる

## カラムのデータ表示を加工
```sql
SELECT
  ProductName AS 商品名
, CASE
    WHEN Price < 1000 THEN 'A'
    WHEN Price < 2000 THEN 'B'
    ELSE 'C'
  END AS ランク
FROM
  Products
;
```

## データのグループ化
```sql
SELECT
  PrefecturalID AS 都道府県
, COUNT(*) AS 顧客数
FROM
  Customers
GROUP BY
  PrefecturalID
;
```

`GROUP BY` で指定したカラムでグループ化。

その後、 `SELECT` の集合関数で集計結果を表示する

集合関数は欲しいデータに合わせて `SUM` とか `AVG` とかも使える

## グループ化したデータの絞り込み
```sql
SELECT
  PrefecturalID AS 都道府県
, COUNT(*) AS 顧客数
FROM
  Customers
WHERE
  CustomerClassID = 1
GROUP BY
  PrefecturalID
HAVING
  COUNT(*) >= 2
;
```

`WHERE` は 1行ごとの絞り込みに使う。
`HAVIGN` はグループ化されたものに対して条件付をするので、 `GROUP BY` のあとになる

## いろいろな組み合わせ
```sql
 SELECT
  CategoryID
, COUNT(*) AS 商品数
FROM
  Products
WHERE
  Price <= 1000
GROUP BY
  CategoryID
HAVING
  COUNT(*) < 5 
ORDER BY
  CategoryID
;
```

この場合の ORDER BY は GROUP 化したものに対して行っているので最後に来てる

## GROUP BY と SUM(CASE) でクロス集計
```sql
SELECT
  HireFiscalYear AS 入社年度
, SUM(
      CASE
         WHEN Height <= 160 THEN 1
         ELSE 0
       END
     ) AS "160cm以下"
, SUM(
      CASE
         WHEN Height <= 170 THEN 1
         ELSE 0
       END
     ) AS "170cm以下"
, SUM(
      CASE
         WHEN Height <= 180 THEN 1
         ELSE 0
       END
     ) AS "180cm以下"
, SUM(
      CASE
         WHEN Height > 180 THEN 1
         ELSE 0
       END
     ) AS "181cm以上"
FROM
  Employees
GROUP BY
  HireFiscalYear
;
```

`CASE WHEN` で条件に当てはまるものに 1 、それ以外に 0 として `SUM` することで集計してる

