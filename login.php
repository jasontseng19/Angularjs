<?php
header('Access-control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();

session_start();

$response = [];

$link = mysqli_connect("localhost","root","","ang_mess");
mysqli_query($link,"SET NAMES UTF8");

$m_account = mysqli_real_escape_string($link, $_POST['m_account']);
$m_pw = mysqli_real_escape_string($link, $_POST['m_pw']);

$sql = "SELECT * FROM `member` WHERE m_account = '$m_account' AND m_pw = '$m_pw'";
$ro = mysqli_query($link, $sql);

if(mysqli_num_rows($ro) > 0 ){
    $response['status'] = 'loggedin';
    $response['user'] = $m_account;
    $response['id'] = md5(uniqid());
    $_SESSION['id'] = $response['id'];
    $_SESSION['user'] = $m_account;
}else{
    $response['status'] = 'error';
};

echo json_encode($response);

?>