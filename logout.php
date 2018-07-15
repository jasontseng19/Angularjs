<?php
session_start();
session_destroy();
session_commit();
//header("location:index.html");
header("location:index.php");
?>