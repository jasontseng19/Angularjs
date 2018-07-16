<?php

session_start();
$user = $_SESSION['user'];

try{
    $link = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "");
    $link->query("SET NAMES UTF8");
}catch(PDOException $e){
    die("資料庫連結失敗".$e->getMessage());
}



$dataJson = file_get_contents("php://input");
$data = json_decode($dataJson, true);
$word = $data['word'];
$id = $data['id'];

$sql = "UPDATE word2 SET w2_word = '$word' WHERE w2_seq = '$id'";
$result = $link->exec($sql);
echo '{"success":'.$result.'}';

$ro = null;
$link = null;

?>