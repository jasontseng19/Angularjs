<?php
//session_start();

    try{
         $link = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "");
         $link->query("SET NAMES UTF8");
    }catch(PDOException $e){
         die("資料庫連結失敗".$e->getMessage());
    }



$sql = "SELECT w_seq,w_title, w_id, w_date FROM word WHERE w_display = '1' ORDER BY w_seq";
$ro = $link->query($sql);
$row = $ro->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);

$ro = null;
$link = null;

?>