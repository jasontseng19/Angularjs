<?php
//session_start();

    try{
         $link = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "A12345678");
         $link->query("SET NAMES UTF8");
    }catch(PDOException $e){
         die("資料庫連結失敗".$e->getMessage());
    }

$dataJson = file_get_contents("php://input");   //获取POST原始数据（JSON）
$data = json_decode($dataJson, true);   //将JSON数据强制转换为数组对象
$id = $data['id'];



$sql = "SELECT * FROM  word WHERE w_seq = '$id';";
$ro = $link->query($sql);
$row = $ro->fetchAll(PDO::FETCH_ASSOC);





echo json_encode($row);

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