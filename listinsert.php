<?php

session_start();
$user = $_SESSION['user'];

$link0 = mysqli_connect("localhost","root","","ang_mess");
mysqli_query($link0,"SET NAMES UTF8");

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
$id = $data['id'];
$word = $data['word'];

$sql0 = "SELECT * FROM word WHERE w_seq = '$id'";
$ro = mysqli_query($link0,$sql0);
$row = mysqli_fetch_row($ro);

$sql = "INSERT INTO word2 VALUES ('','$row[1]','$row[3]','$word','$user','$time','1');";
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