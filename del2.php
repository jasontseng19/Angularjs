<?php

session_start();
$user = $_SESSION['user'];

try{
    $link2 = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "");
    $link2->query("SET NAMES UTF8");
}catch(PDOException $e){
    die("資料庫連結失敗".$e->getMessage());
}

$link = mysqli_connect("localhost","root","","ang_mess");
mysqli_query($link,"SET NAMES UTF8");


$t = strtotime('+6hours');
$time = date('YmdHis',$t);
$today = date('Y-m-d',$t);

$dataJson = file_get_contents("php://input");   //获取POST原始数据（JSON）
$data = json_decode($dataJson, true);   //将JSON数据强制转换为数组对象
$id = $data['id'];


$sql = "SELECT * FROM word WHERE w_seq = '$id'";
$ro = mysqli_query($link, $sql);
$row = mysqli_fetch_row($ro);

$sql2 = "SELECT w2_seq FROM word, word2 
      WHERE '$row[1]' = w1_title
      AND '$row[3]' = w1_id 
      AND w2_display = 1 
      AND w2_id = '$user'
      AND w_seq = '$id';";
$ro2 = mysqli_query($link, $sql2);
$row2 = mysqli_fetch_row($ro2);

$sql3 = "UPDATE word2 SET w2_display = '0' WHERE w2_seq = '$row2[0]'";
$ro3 = $link2->query($sql3);
$row3 = $ro3->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row3);

$ro = null;
$link = null;

?>