<?php

session_start();
$user = $_SESSION['user'];

$link = mysqli_connect("localhost","root","","ang_mess");
mysqli_query($link,"SET NAMES UTF8");

$t = strtotime('+6hours');
$time = date('YmdHis',$t);
$today = date('Y-m-d',$t);

$dataJson = file_get_contents("php://input");   //获取POST原始数据（JSON）
$data = json_decode($dataJson, true);   //将JSON数据强制转换为数组对象
$id = $data['id'];


$sql = "SELECT * FROM word WHERE w_id = '$user' AND w_seq = '$id'";
$ro = mysqli_query($link, $sql);

if(mysqli_num_rows($ro) > 0 ){
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