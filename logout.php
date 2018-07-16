<?php
session_start();
session_destroy();
session_commit();
$_SESSION['id'] = NULL;
$_SESSION['user'] = NULL;

unset($_SESSION['id']);
unset($_SESSION['user']);
?>