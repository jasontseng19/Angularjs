<?php

try{
    $link = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "A12345678");
    $link->query("SET NAMES UTF8");
}catch(PDOException $e){
    die("資料庫連結失敗".$e->getMessage());
}



$dataJson = file_get_contents("php://input");   //获取POST原始数据（JSON）
$data = json_decode($dataJson, true);   //将JSON数据强制转换为数组对象
$title = $data['title'];
$word = $data['word'];
$id = $data['id'];

$sql = "UPDATE word SET w_title = '$title' , w_word = '$word' WHERE w_seq = '$id'";
$result = $link->exec($sql);
echo '{"success":'.$result.'}';

$ro = null;
$link = null;

?>