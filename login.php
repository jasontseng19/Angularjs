<?php
header('Access-control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();

session_start();

$response = [];

$link = mysqli_connect("localhost","root","A12345678","ang_mess");
mysqli_query($link,"SET NAMES UTF8");

$m_account = mysqli_real_escape_string($link, $_POST['m_account']);
$m_pw = mysqli_real_escape_string($link, $_POST['m_pw']);



$sql = "SELECT * FROM `member` WHERE m_account = '$m_account' AND m_pw = '$m_pw'";
$ro = mysqli_query($link, $sql);

if(mysqli_num_rows($ro) > 0 ){
    $response['status'] = 'loggedin';
    $response['user'] = 'admin';
    $response['useruniqueid'] = md5(uniqid());
    $_SESSION['useruniqueid'] = $response['useruniqueid'];
}else{
    $response['status'] = 'error';
};

echo json_encode($response);
/*
print_r($_POST);*/
/*


$objData = json_decode(file_get_contents("php://input")) ;
$strAcoount  = isset($objData->m_account) ? $objData->m_account : '' ;
$strPassword = isset($objData->m_pw) ? $objData->m_pw : '' ;
$objResponse = new stdClass() ;



    if($check == 1){
        $_SESSION['account'] = $strAcoount;
        $objResponse->Message = "登入成功" ;
        $objResponse->Acc = $_SESSION['account'] ;
        echo json_encode($objResponse) ;
        exit() ;
    }else{
        header("HTTP/1.0 403 Forbidden") ;
        $objResponse->Message = "登入失敗" ;
        echo json_encode($objResponse) ;
        exit() ;
    }
*/


?>