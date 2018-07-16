<?php

session_start();
$user = $_SESSION['user'];

try{
    $link = new PDO("mysql:host=localhost;dbname=ang_mess", "root", "");
    $link->query("SET NAMES UTF8");
}catch(PDOException $e){
    die("資料庫連結失敗".$e->getMessage());
}

$t = strtotime('+6hours');
$time = date('YmdHis',$t);
$today = date('Y-m-d',$t);

$dataJson = file_get_contents("php://input");   //获取POST原始数据（JSON）
$data = json_decode($dataJson, true);   //将JSON数据强制转换为数组对象
$title = $data['title'];
$word = $data['word'];

$sql = "INSERT INTO word VALUES ('','$title','$word','$user','$time','1');";
$result = $link->exec($sql);
//echo '{"success":'.$result.'}';

if($result > 0 ){
    $response['status'] = 'loggedin';
    $response['user'] = $user;
    $response['id'] = md5(uniqid());
    $_SESSION['id'] = $response['id'];
    $_SESSION['user'] = $user;
}else{
    $response['status'] = 'error';
};

echo json_encode($response);


$ro = null;
$link = null;

 ?>