<?php
//session_start();

    try{
         $link2 = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "A12345678");
         $link2->query("SET NAMES UTF8");
    }catch(PDOException $e){
         die("資料庫連結失敗".$e->getMessage());
    }

$dataJson = file_get_contents("php://input");   //获取POST原始数据（JSON）
$data = json_decode($dataJson, true);   //将JSON数据强制转换为数组对象
$id = $data['id'];

$link = mysqli_connect("localhost","root","A12345678","ang_mess");
    mysqli_query($link,"SET NAMES UTF8");

$sql = "SELECT * FROM  word WHERE w_seq = '$id';";
$ro = mysqli_query($link,$sql);
//$row = $ro->fetchAll(PDO::FETCH_ASSOC);
$row = mysqli_fetch_row($ro);


$sql2 = "SELECT w2_word,w2_id,w2_date FROM word, word2 
      WHERE '$row[1]' = w1_title
      AND '$row[3]' = w1_id 
      AND w2_display = 1 
      AND w_seq = '$id';";

$ro2 = $link2->query($sql2);
$row2 = $ro2->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($row2);

$ro = null;
$ro2 = null;
$link = null;
$link2 = null;

/*
try{
    $link = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "");
    $link->query("SET NAMES UTF8");
}catch(PDOException $e){
    die("資料庫連結失敗".$e->getMessage());
}



    $id = $_GET['id'];
    echo $id;
    $sql = "SELECT * FROM  word WHERE w_seq = '$id';";
    $ro = $link->query($sql);
    $row = $ro->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($row);

    $ro = null;
    $link = null;

?>
*/